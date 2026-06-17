import { Link } from "@tanstack/react-router";
import { DisplayIcon } from "../../atoms/icon/icon.atm";
import iconImage from "/public/images/icon.png";

export function ReturnHomeLink() {
  return (
    <Link to="/">
      <DisplayIcon
        img={iconImage}
        iconClassName="h-9 w-auto object-contain md:h-16"
        alt="the logo of Rock mein Ding"
      />
    </Link>
  );
}
