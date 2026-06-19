import type { TThemeBtnProps } from "../../lib/types/theme.btn.types";

export function ChangeThemeBtn({ onClick, theme }: TThemeBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="button button--secondary button--icon-only"
      aria-label="change Theme"
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
