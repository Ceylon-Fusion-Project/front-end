import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
    {/* Global Notification System */}
    <Toaster
        richColors
        position="top-right"
        closeButton
        duration={3000}
        theme="light" // Global Theme
        expand={true}
        visibleToasts={5}
      />
    <Router>
        <main className="flex-grow">
          <AppRoutes />
        </main>
    </Router>
    </>
  );
}

export default App;