import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Player from "./pages/Player";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player/:episodeId" element={<Player />} />
      </Routes>
    </Router>
  );
};

export default App;
