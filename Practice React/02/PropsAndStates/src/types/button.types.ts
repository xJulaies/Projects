export type TPublicHeroProps = {
  onGetStartedClick: () => void;
};

export type TQuantityCounter = {
  start: number;
};

export type TQuantityButtonProps = {
  onClick: () => void;
  text: "-" | "+";
};
