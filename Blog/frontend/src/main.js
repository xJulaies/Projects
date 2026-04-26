import "./style.css";
import { Clerk } from "@clerk/clerk-js";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const tokenTemplate = import.meta.env.VITE_CLERK_TOKEN_TEMPLATE;
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

if (!publishableKey) {
  throw new Error("Add your VITE_CLERK_PUBLISHABLE_KEY to the .env file");
}

const state = {
  clerk: null,
  posts: [],
  currentPost: null,
  comments: [],
  profile: null,
  loadingPosts: false,
  loadingPost: false,
  loadingProfile: false,
  submittingPost: false,
  submittingComment: false,
  error: "",
};

function getRoute() {
  const hash = window.location.hash.replace(/^#/, "");

  if (!hash) {
    return { name: "home" };
  }

  const [name, value] = hash.split("/");

  if (name === "post" && value) {
    return { name: "post", id: value };
  }

  if (name === "user" && value) {
    return { name: "user", username: decodeURIComponent(value) };
  }

  return { name: "home" };
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });
}

function formatDate(isoString) {
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(isoString));
}

async function apiFetch(path, options = {}) {
  const requestOptions = { ...options };
  const headers = new Headers(requestOptions.headers || {});

  if (requestOptions.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (requestOptions.auth) {
    if (!state.clerk?.session) {
      throw new Error("You must be signed in");
    }

    const token = tokenTemplate
      ? await state.clerk.session.getToken({ template: tokenTemplate })
      : await state.clerk.session.getToken();

    if (!token) {
      throw new Error(
        "No Clerk token available. Check your session or token template.",
      );
    }

    headers.set("Authorization", `Bearer ${token}`);
  }

  delete requestOptions.auth;
  requestOptions.headers = headers;

  const response = await fetch(`${apiBaseUrl}${path}`, requestOptions);
  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    throw new Error(payload?.message || "Request failed");
  }

  return payload;
}

async function loadPosts() {
  state.loadingPosts = true;
  state.error = "";
  renderApp();

  try {
    const answer = await apiFetch("/blog/posts");
    state.posts = answer.data || [];
  } catch (error) {
    state.error = error.message;
  } finally {
    state.loadingPosts = false;
    renderApp();
  }
}

async function loadPost(postId) {
  state.loadingPost = true;
  state.error = "";
  state.currentPost = null;
  state.comments = [];
  renderApp();

  try {
    const [postAnswer, commentAnswer] = await Promise.all([
      apiFetch(`/blog/posts/${postId}`),
      apiFetch(`/blog/posts/${postId}/comments`),
    ]);

    state.currentPost = postAnswer.data?.[0] || null;
    state.comments = commentAnswer.data || [];
  } catch (error) {
    state.error = error.message;
  } finally {
    state.loadingPost = false;
    renderApp();
  }
}

async function loadProfile(username) {
  state.loadingProfile = true;
  state.error = "";
  state.profile = null;
  renderApp();

  try {
    const [postsAnswer, commentsAnswer] = await Promise.all([
      apiFetch(`/blog/users/${encodeURIComponent(username)}/posts`),
      apiFetch(`/blog/users/${encodeURIComponent(username)}/comments`),
    ]);

    state.profile = {
      username,
      posts: postsAnswer.data || [],
      comments: commentsAnswer.data || [],
    };
  } catch (error) {
    state.error = error.message;
  } finally {
    state.loadingProfile = false;
    renderApp();
  }
}

function buildPostCard(post, compact = false) {
  return `
    <article class="rounded-card border border-stone-900/8 bg-paper-strong p-5 shadow-soft transition-transform duration-300 hover:-translate-y-1">
      <a class="grid gap-2" href="#post/${post.id}">
        <p class="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-accent">${escapeHtml(post.authorUsername)}</p>
        <h3 class="font-display text-[1.35rem] leading-[1.05] text-ink ${compact ? "line-clamp-2" : ""}">
          ${escapeHtml(post.title)}
        </h3>
        <p class="text-[0.98rem] leading-7 text-stone-700 ${compact ? "line-clamp-3" : ""}">
          ${escapeHtml(post.content)}
        </p>
      </a>
      <div class="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
        <button class="font-medium text-accent-deep hover:underline" data-profile-link="${escapeHtml(post.authorUsername)}" type="button">
          @${escapeHtml(post.authorUsername)}
        </button>
        <span>${formatDate(post.createdAt)}</span>
      </div>
    </article>
  `;
}

function buildCommentItem(comment, withPost = false) {
  return `
    <article class="rounded-[1.2rem] border border-stone-900/8 bg-paper-strong p-5 shadow-soft">
      <div class="mb-3 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
        <button class="font-medium text-accent-deep hover:underline" data-profile-link="${escapeHtml(comment.authorUsername)}" type="button">
          @${escapeHtml(comment.authorUsername)}
        </button>
        <span>${formatDate(comment.createdAt)}</span>
      </div>
      <p class="text-[0.98rem] leading-7 text-stone-700">${escapeHtml(comment.text)}</p>
      ${
        withPost && comment.post
          ? `<a class="mt-4 inline-block text-sm font-medium text-accent-deep hover:underline" href="#post/${comment.post.id}">Zum Post: ${escapeHtml(comment.post.title)}</a>`
          : ""
      }
    </article>
  `;
}

function renderSidebar(clerk) {
  const signedIn = clerk?.isSignedIn;

  return `
    <aside class="sticky top-6 self-start rounded-shell border border-stone-900/10 bg-[rgba(255,252,246,0.92)] p-7 shadow-float backdrop-blur xl:min-h-[calc(100vh-3rem)]">
      <div class="space-y-5">
        <div class="space-y-3">
          <p class="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-accent">Blog</p>
          <h1 class="font-display text-5xl leading-[0.92] text-ink">
            Stories, Kommentare und Profile in einer klaren Oberfläche.
          </h1>
          <p class="text-[0.98rem] leading-7 text-muted">
            Das Frontend spricht mit dem Clerk-geschützten Backend und zeigt Feed,
            Detailseiten und Profile in einer einfachen Struktur.
          </p>
        </div>

        <div class="rounded-[1.4rem] border border-stone-900/10 bg-paper-strong p-5">
          <div class="mb-4 space-y-1">
            <h2 class="font-display text-2xl text-ink">Account</h2>
            <p class="text-sm leading-6 text-muted">
              ${signedIn ? "Du kannst jetzt schreiben und kommentieren." : "Lesen geht öffentlich. Das Sign-in findest du mittig im Hauptbereich."}
            </p>
          </div>
          ${signedIn ? `<div id="user-button-slot" class="min-h-0"></div>` : ""}
        </div>

        <nav class="grid gap-2 text-sm font-semibold text-accent-deep">
          <a class="rounded-full bg-accent-soft px-4 py-3 transition-colors hover:bg-orange-200" href="#">Alle Posts</a>
          ${
            signedIn && clerk.user?.username
              ? `<a class="rounded-full bg-stone-900/5 px-4 py-3 transition-colors hover:bg-stone-900/10" href="#user/${encodeURIComponent(clerk.user.username)}">Mein Profil</a>`
              : ""
          }
        </nav>
      </div>
    </aside>
  `;
}

function renderComposer(clerk) {
  if (!clerk?.isSignedIn) {
    return `
      <section class="rounded-panel border border-stone-900/8 bg-white/70 p-6 shadow-soft">
        <h2 class="font-display text-3xl text-ink">Neuen Post schreiben</h2>
        <p class="mt-3 text-[0.98rem] leading-7 text-muted">
          Melde dich an, um eigene Posts zu erstellen.
        </p>
      </section>
    `;
  }

  return `
    <section class="rounded-panel border border-stone-900/8 bg-[rgba(255,252,246,0.94)] p-6 shadow-soft">
      <div class="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p class="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent">Create</p>
          <h2 class="font-display text-3xl text-ink">Neuen Post schreiben</h2>
        </div>
        <span class="rounded-full bg-accent-soft px-3 py-2 text-xs font-bold uppercase tracking-[0.15em] text-accent-deep">
          ${escapeHtml(clerk.user?.username || "user")}
        </span>
      </div>

      <form id="post-form" class="grid gap-4">
        <label class="grid gap-2 text-sm font-semibold text-stone-700">
          <span>Titel</span>
          <input class="rounded-2xl border border-stone-900/12 bg-white px-4 py-3 text-base font-normal text-stone-900 outline-none transition focus:border-accent focus:ring-4 focus:ring-orange-100" name="title" maxlength="120" placeholder="Ein klarer Titel" required />
        </label>
        <label class="grid gap-2 text-sm font-semibold text-stone-700">
          <span>Inhalt</span>
          <textarea class="min-h-36 rounded-2xl border border-stone-900/12 bg-white px-4 py-3 text-base font-normal leading-7 text-stone-900 outline-none transition focus:border-accent focus:ring-4 focus:ring-orange-100" name="content" rows="5" maxlength="10000" placeholder="Was möchtest du teilen?" required></textarea>
        </label>
        <button class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-deep px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:brightness-105 disabled:cursor-progress disabled:opacity-70" type="submit" ${state.submittingPost ? "disabled" : ""}>
          ${state.submittingPost ? "Speichert..." : "Post veröffentlichen"}
        </button>
      </form>
    </section>
  `;
}

function renderHomeView(clerk) {
  return `
    <section class="grid gap-6 xl:grid-cols-[minmax(320px,420px)_minmax(0,1fr)]">
      ${
        clerk?.isSignedIn
          ? renderComposer(clerk)
          : `
            <section class="rounded-panel border border-stone-900/8 bg-[rgba(255,252,246,0.94)] p-6 shadow-soft">
              <div class="flex min-h-[42rem] flex-col justify-between gap-10">
                <div class="max-w-md space-y-4">
                  <p class="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-accent">Sign in</p>
                  <h2 class="font-display text-4xl leading-tight text-ink">
                    Melde dich an, um selbst zu schreiben und mitzudiskutieren.
                  </h2>
                  <p class="text-[0.98rem] leading-7 text-muted">
                    Lesen ist öffentlich. Sobald du eingeloggt bist, kannst du eigene Posts
                    veröffentlichen, Kommentare schreiben und dein Profil direkt aus dem Feed aufrufen.
                  </p>
                </div>

                <div class="mx-auto flex min-h-[26rem] w-full max-w-xl items-center justify-center rounded-[1.6rem] border border-stone-900/8 bg-white/40 p-6">
                  <div id="auth-slot" class="w-full min-h-0"></div>
                </div>
              </div>
            </section>
          `
      }

      <section class="rounded-panel border border-stone-900/8 bg-[rgba(255,252,246,0.94)] p-6 shadow-soft">
        <div class="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p class="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent">Feed</p>
            <h2 class="font-display text-3xl text-ink">Aktuelle Posts</h2>
          </div>
          <span class="rounded-full bg-accent-soft px-3 py-2 text-xs font-bold uppercase tracking-[0.15em] text-accent-deep">
            ${state.posts.length} Einträge
          </span>
        </div>

        ${
          state.loadingPosts
            ? `<div class="rounded-[1.2rem] border border-dashed border-stone-900/12 bg-white/70 px-6 py-10 text-center text-[0.98rem] text-muted">Posts werden geladen...</div>`
            : state.posts.length
              ? `<div class="grid gap-4">${state.posts.map((post) => buildPostCard(post)).join("")}</div>`
              : `<div class="rounded-[1.2rem] border border-dashed border-stone-900/12 bg-white/70 px-6 py-10 text-center text-[0.98rem] text-muted">Noch keine Posts da. Der erste Eintrag kann von dir kommen.</div>`
        }
      </section>
    </section>
  `;
}

function renderPostView(clerk) {
  const post = state.currentPost;

  if (state.loadingPost) {
    return `<section class="rounded-panel border border-stone-900/8 bg-[rgba(255,252,246,0.94)] p-6 shadow-soft"><div class="rounded-[1.2rem] border border-dashed border-stone-900/12 bg-white/70 px-6 py-10 text-center text-[0.98rem] text-muted">Post und Kommentare werden geladen...</div></section>`;
  }

  if (!post) {
    return `<section class="rounded-panel border border-stone-900/8 bg-[rgba(255,252,246,0.94)] p-6 shadow-soft"><div class="rounded-[1.2rem] border border-dashed border-stone-900/12 bg-white/70 px-6 py-10 text-center text-[0.98rem] text-muted">Der gewünschte Post konnte nicht geladen werden.</div></section>`;
  }

  return `
    <section class="grid gap-6">
      <section class="rounded-panel border border-stone-900/8 bg-[rgba(255,252,246,0.94)] p-6 shadow-soft">
        <a class="mb-5 inline-flex text-sm font-semibold text-accent-deep hover:underline" href="#">Zurück zum Feed</a>
        <p class="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-accent">${escapeHtml(post.authorUsername)}</p>
        <h2 class="mt-2 font-display text-5xl leading-[0.95] text-ink">${escapeHtml(post.title)}</h2>
        <p class="mt-6 whitespace-pre-wrap text-[1.02rem] leading-8 text-stone-700">${escapeHtml(post.content)}</p>
        <div class="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
          <button class="font-medium text-accent-deep hover:underline" data-profile-link="${escapeHtml(post.authorUsername)}" type="button">
            @${escapeHtml(post.authorUsername)}
          </button>
          <span>${formatDate(post.createdAt)}</span>
        </div>
      </section>

      <section class="rounded-panel border border-stone-900/8 bg-[rgba(255,252,246,0.94)] p-6 shadow-soft">
        <div class="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p class="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent">Comments</p>
            <h2 class="font-display text-3xl text-ink">Diskussion</h2>
          </div>
          <span class="rounded-full bg-accent-soft px-3 py-2 text-xs font-bold uppercase tracking-[0.15em] text-accent-deep">
            ${state.comments.length} Kommentare
          </span>
        </div>

        ${
          clerk?.isSignedIn
            ? `
              <form id="comment-form" class="mb-6 grid gap-4">
                <label class="grid gap-2 text-sm font-semibold text-stone-700">
                  <span>Kommentar</span>
                  <textarea class="min-h-32 rounded-2xl border border-stone-900/12 bg-white px-4 py-3 text-base font-normal leading-7 text-stone-900 outline-none transition focus:border-accent focus:ring-4 focus:ring-orange-100" name="text" rows="4" maxlength="2000" placeholder="Schreib deine Antwort..." required></textarea>
                </label>
                <button class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-deep px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:brightness-105 disabled:cursor-progress disabled:opacity-70" type="submit" ${state.submittingComment ? "disabled" : ""}>
                  ${state.submittingComment ? "Speichert..." : "Kommentar senden"}
                </button>
              </form>
            `
            : `<div class="mb-6 rounded-[1.2rem] border border-dashed border-stone-900/12 bg-white/70 px-6 py-6 text-center text-[0.98rem] text-muted">Melde dich an, um mitzudiskutieren.</div>`
        }

        ${
          state.comments.length
            ? `<div class="grid gap-4">${state.comments.map((comment) => buildCommentItem(comment)).join("")}</div>`
            : `<div class="rounded-[1.2rem] border border-dashed border-stone-900/12 bg-white/70 px-6 py-10 text-center text-[0.98rem] text-muted">Noch keine Kommentare. Starte die Diskussion.</div>`
        }
      </section>
    </section>
  `;
}

function renderProfileView() {
  const profile = state.profile;

  if (state.loadingProfile) {
    return `<section class="rounded-panel border border-stone-900/8 bg-[rgba(255,252,246,0.94)] p-6 shadow-soft"><div class="rounded-[1.2rem] border border-dashed border-stone-900/12 bg-white/70 px-6 py-10 text-center text-[0.98rem] text-muted">Profilinhalte werden geladen...</div></section>`;
  }

  if (!profile) {
    return `<section class="rounded-panel border border-stone-900/8 bg-[rgba(255,252,246,0.94)] p-6 shadow-soft"><div class="rounded-[1.2rem] border border-dashed border-stone-900/12 bg-white/70 px-6 py-10 text-center text-[0.98rem] text-muted">Das Profil konnte nicht geladen werden.</div></section>`;
  }

  return `
    <section class="grid gap-6">
      <section class="rounded-panel border border-stone-900/8 bg-[rgba(255,252,246,0.94)] p-6 shadow-soft">
        <a class="mb-5 inline-flex text-sm font-semibold text-accent-deep hover:underline" href="#">Zurück zum Feed</a>
        <p class="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-accent">Profil</p>
        <h2 class="mt-2 font-display text-5xl leading-[0.95] text-ink">@${escapeHtml(profile.username)}</h2>
        <p class="mt-5 max-w-2xl text-[0.98rem] leading-7 text-muted">
          Alle veröffentlichten Posts und Kommentare dieses Users an einem Ort.
        </p>
      </section>

      <section class="rounded-panel border border-stone-900/8 bg-[rgba(255,252,246,0.94)] p-6 shadow-soft">
        <div class="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p class="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent">Posts</p>
            <h2 class="font-display text-3xl text-ink">Veröffentlichungen</h2>
          </div>
          <span class="rounded-full bg-accent-soft px-3 py-2 text-xs font-bold uppercase tracking-[0.15em] text-accent-deep">
            ${profile.posts.length} Posts
          </span>
        </div>

        ${
          profile.posts.length
            ? `<div class="grid gap-4">${profile.posts.map((post) => buildPostCard(post, true)).join("")}</div>`
            : `<div class="rounded-[1.2rem] border border-dashed border-stone-900/12 bg-white/70 px-6 py-10 text-center text-[0.98rem] text-muted">Dieser User hat noch keine Posts veröffentlicht.</div>`
        }
      </section>

      <section class="rounded-panel border border-stone-900/8 bg-[rgba(255,252,246,0.94)] p-6 shadow-soft">
        <div class="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p class="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent">Comments</p>
            <h2 class="font-display text-3xl text-ink">Beiträge in Diskussionen</h2>
          </div>
          <span class="rounded-full bg-accent-soft px-3 py-2 text-xs font-bold uppercase tracking-[0.15em] text-accent-deep">
            ${profile.comments.length} Kommentare
          </span>
        </div>

        ${
          profile.comments.length
            ? `<div class="grid gap-4">${profile.comments.map((comment) => buildCommentItem(comment, true)).join("")}</div>`
            : `<div class="rounded-[1.2rem] border border-dashed border-stone-900/12 bg-white/70 px-6 py-10 text-center text-[0.98rem] text-muted">Dieser User hat noch keine Kommentare geschrieben.</div>`
        }
      </section>
    </section>
  `;
}

function renderContent() {
  const route = getRoute();

  if (route.name === "post") {
    return renderPostView(state.clerk);
  }

  if (route.name === "user") {
    return renderProfileView();
  }

  return renderHomeView(state.clerk);
}

function renderApp() {
  const app = document.getElementById("app");
  const clerk = state.clerk;

  app.innerHTML = `
    <div class="mx-auto grid min-h-screen w-full max-w-[1320px] gap-6 px-4 py-6 xl:grid-cols-[360px_minmax(0,1fr)]">
      ${renderSidebar(clerk)}
      <main class="grid content-start gap-6">
        ${state.error ? `<div class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">${escapeHtml(state.error)}</div>` : ""}
        ${renderContent()}
      </main>
    </div>
  `;

  mountAuthUI();
}

function mountAuthUI() {
  if (!state.clerk) {
    return;
  }

  const authSlot = document.getElementById("auth-slot");
  const userButtonSlot = document.getElementById("user-button-slot");

  if (state.clerk.isSignedIn) {
    if (authSlot) {
      authSlot.innerHTML = "";
    }

    if (userButtonSlot) {
      userButtonSlot.innerHTML = "";
      state.clerk.mountUserButton(userButtonSlot);
    }
  } else {
    if (userButtonSlot) {
      userButtonSlot.innerHTML = "";
    }

    if (authSlot) {
      authSlot.innerHTML = "";
      state.clerk.mountSignIn(authSlot);
    }
  }
}

async function handlePostSubmit(form) {
  const formData = new FormData(form);
  state.submittingPost = true;
  state.error = "";
  renderApp();

  try {
    const payload = {
      title: formData.get("title"),
      content: formData.get("content"),
    };

    const answer = await apiFetch("/blog/posts", {
      method: "POST",
      auth: true,
      body: JSON.stringify(payload),
    });

    const createdPost = answer.data?.[0];

    form.reset();
    await loadPosts();

    if (createdPost?.id) {
      window.location.hash = `#post/${createdPost.id}`;
    }
  } catch (error) {
    state.error = error.message;
    renderApp();
  } finally {
    state.submittingPost = false;
    renderApp();
  }
}

async function handleCommentSubmit(form) {
  const route = getRoute();

  if (route.name !== "post") {
    return;
  }

  const formData = new FormData(form);
  state.submittingComment = true;
  state.error = "";
  renderApp();

  try {
    const payload = {
      text: formData.get("text"),
    };

    await apiFetch(`/blog/posts/${route.id}/comments`, {
      method: "POST",
      auth: true,
      body: JSON.stringify(payload),
    });

    form.reset();
    await loadPost(route.id);
  } catch (error) {
    state.error = error.message;
    renderApp();
  } finally {
    state.submittingComment = false;
    renderApp();
  }
}

document.addEventListener("submit", (event) => {
  const form = event.target;

  if (!(form instanceof HTMLFormElement)) {
    return;
  }

  if (form.id === "post-form") {
    event.preventDefault();
    handlePostSubmit(form);
  }

  if (form.id === "comment-form") {
    event.preventDefault();
    handleCommentSubmit(form);
  }
});

document.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  const profileLink = target.closest("[data-profile-link]");

  if (profileLink instanceof HTMLElement) {
    const username = profileLink.dataset.profileLink;

    if (username) {
      window.location.hash = `#user/${encodeURIComponent(username)}`;
    }
  }
});

window.addEventListener("hashchange", async () => {
  const route = getRoute();

  if (route.name === "post") {
    await loadPost(route.id);
    return;
  }

  if (route.name === "user") {
    await loadProfile(route.username);
    return;
  }

  state.currentPost = null;
  state.profile = null;
  state.comments = [];
  renderApp();
});

async function bootstrap() {
  const clerkDomain = atob(publishableKey.split("_")[2]).slice(0, -1);

  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://${clerkDomain}/npm/@clerk/ui@1/dist/ui.browser.js`;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.onload = resolve;
    script.onerror = () => reject(new Error("Failed to load @clerk/ui bundle"));
    document.head.appendChild(script);
  });

  const clerk = new Clerk(publishableKey);
  window.clerk = clerk;

  await clerk.load({
    ui: { ClerkUI: window.__internal_ClerkUICtor },
  });

  state.clerk = clerk;

  clerk.addListener(() => {
    renderApp();
  });

  renderApp();
  await loadPosts();

  const route = getRoute();

  if (route.name === "post") {
    await loadPost(route.id);
  }

  if (route.name === "user") {
    await loadProfile(route.username);
  }
}

bootstrap().catch((error) => {
  const app = document.getElementById("app");
  app.innerHTML = `<div class="px-6 py-8 text-base font-semibold text-red-700">${escapeHtml(error.message)}</div>`;
});
