import { Link } from "@tanstack/react-router";
import { DisplayIcon } from "../../atoms/icon/icon.atm";

export function ReturnHomeLink() {
  return (
    <Link to="/">
      <DisplayIcon iconClassName="h-9 w-auto object-contain md:h-16" />
    </Link>
  );
}
