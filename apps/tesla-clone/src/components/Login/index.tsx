import { useState, FC, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../firebase';
import { login } from '../../features/userSlide';

import ButtonPrimary from '../Button/primary';
import ButtonSecondary from '../Button/secondary';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import './Login.scss';

const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<{ name?: string; code?: string } | null>(null);

  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispatch(
          login({
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            email: userAuth.user.email,
          })
        );

        navigate('/tesla-account');
      })
      .catch((error) => setError(error));
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
        <form className="login__form" onSubmit={handleSignIn}>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error ? <p className="signup__error">{`${error.name}: ${error.code}`}</p> : null}

          <ButtonPrimary name="Sign In" type="submit" />
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
};

export default Login;
