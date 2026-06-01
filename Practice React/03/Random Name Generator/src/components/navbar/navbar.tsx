import { useEffect, useState } from "react";

export function PublicNavbar() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkTheme ? "dark" : "light",
    );
  }, [isDarkTheme]);

  return (
    <>
      <div className="navbar bg-base-100 sticky z-50 top-0 shadow-sm">
        <div className="navbar-start"></div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-4xl">Random Name Generator</a>
        </div>
        <div className="navbar-end">
          <label className="swap swap-rotate btn btn-ghost btn-circle">
            <input
              type="checkbox"
              checked={isDarkTheme}
              onChange={(event) => setIsDarkTheme(event.target.checked)}
              aria-label="Toggle theme"
            />
            <svg
              className="swap-off h-5 w-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64 17l-.71.71a1 1 0 001.41 1.41l.71-.71A1 1 0 005.64 17zM5 12a1 1 0 00-1-1H3a1 1 0 000 2h1a1 1 0 001-1zm7-7a1 1 0 001-1V3a1 1 0 00-2 0v1a1 1 0 001 1zm5.66 2.34a1 1 0 00.7-.29l.71-.71a1 1 0 10-1.41-1.41l-.71.71a1 1 0 00.71 1.7zm-11.32-.29a1 1 0 00.71-1.7l-.71-.71a1 1 0 00-1.41 1.41l.71.71a1 1 0 00.7.29zM21 11h-1a1 1 0 000 2h1a1 1 0 000-2zm-9 8a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zm6.36-2a1 1 0 00-1.41 1.41l.71.71a1 1 0 001.41-1.41l-.71-.71zM12 7a5 5 0 100 10 5 5 0 000-10z" />
            </svg>
            <svg
              className="swap-on h-5 w-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73A8.15 8.15 0 019.08 5.49a8.6 8.6 0 01.25-2A1 1 0 008 2.36 10.14 10.14 0 002.36 8a10.09 10.09 0 1019.28 6.73 1 1 0 000-1.73z" />
            </svg>
          </label>
        </div>
      </div>
    </>
  );
}
