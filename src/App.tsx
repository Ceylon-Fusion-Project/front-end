import { useState } from "react";
import "./App.css";
import Marketplace from "./components/MarketPlace";
import Example from "./components/Example";

function App() {

  return (
    <>
      {/* Just a quick test to confirm classes work */}
      <div className="bg-blue-400 text-white text-center p-8">
        <h1 className="text-4xl font-bold">Hello Tailwind!</h1>
        <p className="mt-2">This is working fine.</p>
      </div>
      <Marketplace />
      <Example/>
    </>
  );
}

export default App;
