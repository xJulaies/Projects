import type { TPublicHeroProps } from "../../types/button.types";

export function PublicHero({ onGetStartedClick }: TPublicHeroProps) {
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
          <h1 className="mb-5 text-5xl font-bold">Welcome!</h1>
          <p className="mb-5">Do you want to know more about our game?</p>
          <button onClick={onGetStartedClick} className="btn btn-primary">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
