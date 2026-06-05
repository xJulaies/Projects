import { Header } from "../header/header";
import { CardSearchBar } from "../cardSearch/cardSearchBar";

export function CardLayout() {
  return (
    <>
      <Header text="look up any card you want!" title="Yu-Gi-Oh Dex" />
      <CardSearchBar onSearch={} />
    </>
  );
}
