import { Header } from "../../../../../shared/components/molecules/Header/header.mol";
import { RandomCard } from "../../../../randomCard/components/organisms/RandomCard/randomCard.org";

export function PublicHero() {
  return (
    <>
      <section className="hero min-h-screen bg-base-300 px-4 py-12 ">
        <div className="hero-content grid w-full max-w-7xl grid-cols-1 items-center justify-items-center gap-8 lg:grid-cols-[18rem_1fr_18rem]">
          <aside className="flex justify-center">
            <RandomCard />
          </aside>
          <div className="max-w-xl text-center">
            <Header
              text="Explore the vast Universe of Yu-Gi-Oh!"
              title="Yu-Gi-Oh Dex"
            />
          </div>
          <aside className="flex justify-center">
            <RandomCard />
          </aside>
        </div>
      </section>
    </>
  );
}
