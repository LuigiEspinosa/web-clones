import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./components/Header";
import Menu from "./components/Menu";
import HeaderBlock from "./components/HeaderBlock";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { selectUser } from "./features/userSlice";
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector(selectUser);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                {isMenuOpen ? <Menu /> : null}
                <HeaderBlock />
              </>
            }
          />

          <Route
            exact
            path="/login"
            element={user ? <Navigate to="/tesla-account" /> : <Login />}
          />

          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
