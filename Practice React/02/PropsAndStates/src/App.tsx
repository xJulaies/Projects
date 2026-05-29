import "./App.css";
import { PublicNavbar } from "./components/navbars/public.navbar";
import { PublicHero } from "./components/hero/public.hero";
import { CurrencyProductCards } from "./components/product/product.cards";
import { products } from "./components/product/product";

function App() {
  function handleGetStartedClick() {
    console.log("Get started clicked");
  }

  return (
    <>
      <PublicNavbar />
      <PublicHero onGetStartedClick={handleGetStartedClick} />
      <section className="grid content-center place-items-center grid-cols-1 md:grid-cols-3 gap-4 p-16">
        {products.map((product) => (
          <CurrencyProductCards key={product.name} {...product} />
        ))}
      </section>
    </>
  );
}

export default App;
