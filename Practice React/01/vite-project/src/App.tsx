import { PublicFooter } from "./components/footers/public.footer";
import { PublicHero } from "./components/heroes/public.hero";
import { PublicNavbar } from "./components/navbars/public.navbar";
import { ProductCard } from "./components/cards/product.cards";
import { productCards } from "./data/product-cards.data";

function App() {
  function handleGetStartedClick() {
    document
      .querySelector(".product-section")
      ?.scrollIntoView({ behavior: "smooth" });
    console.log("Get Started clicked!");
  }
  return (
    <>
      <PublicNavbar />
      <PublicHero onGetStartedClick={handleGetStartedClick} />
      <section className="product-section">
        <div className="grid content-center place-items-center grid-cols-1 md:grid-cols-3 gap-4 p-16">
          {productCards.map((card) => (
            <ProductCard key={card.title} {...card} />
          ))}
        </div>
      </section>
      <PublicFooter />
    </>
  );
}

export default App;
