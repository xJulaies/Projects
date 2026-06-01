import { useState } from "react";

import { DisplayAllNames } from "./components/DisplayAllNames/all.names";
import { RandomizeName } from "./components/randomNameGenerator/randomNameGenerator";
import { PublicNavbar } from "./components/navbar/navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <PublicNavbar />
      <main>
        <section className="content flex min-h-screen items-center justify-center gap-4 ">
          <RandomizeName />
          <DisplayAllNames />
        </section>
        <footer></footer>
      </main>
    </>
  );
}

export default App;
