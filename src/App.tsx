import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";

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