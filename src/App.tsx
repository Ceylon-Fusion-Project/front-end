import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import ShoppingCartPage from "./pages/ShoppingCart";
//import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router>
        <main className="flex-grow">
          {/* <AppRoutes /> */}
          <ShoppingCartPage />
        </main>
    </Router>
  );
}

export default App;