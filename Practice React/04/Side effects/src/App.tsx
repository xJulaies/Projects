import "./App.css";
import { ChangeColor } from "./components/changeColor/change.color";

function App() {
  return (
    <>
      <main>
        <section className="flex flex-col p-8 m-8 gap-4">
          <div>
            <h1>Change the box!</h1>
          </div>
          <div>
            <h2>A box!</h2>

            <ChangeColor />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
