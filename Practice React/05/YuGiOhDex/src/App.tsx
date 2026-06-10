import "./App.css";
import { PublicLayout } from "./layouts/templates/PublicLayout/public.layout.tpl";
import { CardLayout } from "./layouts/templates/CardLayout/cardLayout.tpl";

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
