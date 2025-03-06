import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import WishlistPage from "./pages/WishlistPage";
//import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router>
        <main className="flex-grow">
          {/* <AppRoutes /> */}
          <WishlistPage />
        </main>
    </Router>
  );
}

export default App;