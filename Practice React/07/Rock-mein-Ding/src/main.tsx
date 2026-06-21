import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/react";
import "./index.css";
import App from "./App.tsx";
import { BandProvider } from "./features/bands/context/bandProvider.tsx";
import { Toast } from "@heroui/react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BandProvider>
        <App />
        <Toast.Provider placement="top end" />
      </BandProvider>
    </ClerkProvider>
  </StrictMode>,
);
