import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
        <main className="flex-grow">
          <AppRoutes />
        </main>
    </Router>
  );
}

export default App;
