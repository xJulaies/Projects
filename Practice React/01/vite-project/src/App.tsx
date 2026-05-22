import { PublicFooter } from "./components/footers/public.footer";
import { PublicHero } from "./components/heroes/public.hero";
import { PublicNavbar } from "./components/navbars/public.navbar";

function App() {
  return (
    <>
      <PublicNavbar />
      <PublicHero />
      <PublicFooter />
    </>
  );
}

export default App;
