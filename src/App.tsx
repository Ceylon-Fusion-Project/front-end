//import { useState } from "react";
import "./App.css";
import Marketplace from "./components/MarketPlace";
import Example from "./components/Example";
import LandingPage from './pages/LandingPage';

function App() {

  return (
    <>
      {/* Just a quick test to confirm classes work */}
      <div className="p-8 text-center text-white bg-blue-400">
        <h1 className="text-4xl font-bold">Hello Tailwind!</h1>
        <p className="mt-2">This is working fine.</p>
      </div>
      <Marketplace />
      <Example/>
      <div>

      <LandingPage />
      
    </div>
      

    </>
  );
}

export default App;
