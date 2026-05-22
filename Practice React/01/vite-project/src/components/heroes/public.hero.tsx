export function PublicHero() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url('/assets/images/public.heroes.background.png')",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
            Interested in learning React? So am I and it's great to have you!
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}
