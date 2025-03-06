import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
//import AppRoutes from "./routes/AppRoutes";
import OrderCheckout from "./pages/OrderCheckout";

function App() {
  return (
    <Router>
        <main className="flex-grow">
          {/* <AppRoutes /> */}
          <OrderCheckout />
        </main>
    </Router>
  );
}

export default App;