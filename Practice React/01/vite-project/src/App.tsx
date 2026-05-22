import { PublicFooter } from "./components/footers/public.footer";
import { PublicHero } from "./components/heroes/public.hero";
import { PublicNavbar } from "./components/navbars/public.navbar";
import { ProductCard } from "./components/cards/product.cards";
import { productCards } from "./data/product-cards.data";

function App() {
  return (
    <>
      <PublicNavbar />
      <PublicHero />
      <div className="grid content-center place-items-center grid-cols-1 md:grid-cols-3 gap-4 p-16">
        {productCards.map((card) => (
          <ProductCard key={card.title} {...card} />
        ))}
      </div>
      <PublicFooter />
    </>
  );
}

export default App;
