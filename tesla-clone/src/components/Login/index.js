import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { login } from "../../features/userSlice";

import ButtonPrimary from "../Button/primary";
import ButtonSecondary from "../Button/secondary";
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";
import "./Login.css";

function Login() {
  const dispath = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispath(
          login({
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            email: userAuth.user.email,
          })
        );

        navigate("/tesla-account");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="login">
      <div className="login__header">
        <div className="login__logo">
          <Link to="/">
            <img
              src="https://assets.website-files.com/5e8fceb1c9af5c3915ec97a0/5ec2f037975ed372da9f6286_Tesla-Logo-PNG-HD.png"
              alt=""
            />
          </Link>
        </div>

        <div className="login__language">
          <LanguageOutlinedIcon /> <span>en-US</span>
        </div>
      </div>

      <div className="login__info">
        <h1>Sign In</h1>
        <form className="login__form">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <ButtonPrimary name="Sign In" type="submit" onClick={handleSignIn} />
        </form>

        <div className="login__divider">
          <hr /> <span>OR</span> <hr />
        </div>

        <Link to="/signup">
          <ButtonSecondary name="create account" />
        </Link>
      </div>
    </div>
  );
}

export default Login;
