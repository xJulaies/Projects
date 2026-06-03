import "./App.css";
import { useState, useEffect } from "react";
import { PublicLayout } from "./components/Layouts/public.layout";
import { PokeCard } from "./components/ProductCards/pokeCard";

function App() {
  const [card, setCard] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const data = await fetch("");
        if (!data.ok) {
          throw new Error("Could not fetch Data");
        }
        const yugiohArray = await data.json();
        setCard(yugiohArray.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return (
    <>
      <PublicLayout>
        <main>
          <PokeCard />
        </main>
      </PublicLayout>
    </>
  );
}

export default App;
