import { GlobalProvider } from "./contexts/GlobalContext";

// pages
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <GlobalProvider>
      <HomePage />
    </GlobalProvider>
  )
};