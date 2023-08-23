// file name: App.tsx

import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase';
import { login, logout, selectUser } from '../features/userSlide';

import Header from '../components/Header';
import Menu from '../components/Menu';
import HeaderBlock from '../components/HeaderBlock';
import Login from '../components/Login';
import Signup from '../components/Signup';
import TeslaAccount from '../components/TeslaAccount';
import './app.scss';

interface UserAuth {
  uid: string;
  displayName: string | null;
  email: string | null;
}

function App() {
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth: UserAuth | null) => {
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
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                {isMenuOpen ? <Menu /> : null}
                <HeaderBlock />
              </>
            }
          />

          <Route path="/login" element={user ? <Navigate to="/tesla-account" /> : <Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route
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
    </BrowserRouter>
  );
}

export default App;
