import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header";
import Menu from "./components/Menu";
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="App">
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        {isMenuOpen ? <Menu /> : null}
      </div>
    </Router>
  );
}

export default App;
