import "./App.css";
import { PublicLayout } from "./components/layouts/public.layout";
import { CardLayout } from "./components/layouts/card.layout";

function App() {
  return (
    <>
      <PublicLayout>
        <main className="flex-1">
          <CardLayout />
        </main>
      </PublicLayout>
    </>
  );
}

export default App;
