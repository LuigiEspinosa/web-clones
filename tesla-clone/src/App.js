import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase";
import { login, logout, selectUser } from "./features/userSlice";

import Header from "./components/Header";
import Menu from "./components/Menu";
import HeaderBlock from "./components/HeaderBlock";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TeslaAccount from "./components/TeslaAccount";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // User is Signed In
        dispatch(
          login({
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            email: userAuth.email,
          })
        );
      } else {
        // User is Signed Out
        dispatch(logout());
      }
    });
  }, [dispatch]);

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

          <Route
            exact
            path="/tesla-account"
            element={
              !user ? (
                <Navigate to="/login" />
              ) : (
                <>
                  <TeslaAccount isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                  {isMenuOpen ? <Menu /> : null}
                </>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
