import { FC, useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  UserCredential,
  AuthError,
  updateProfile,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '../../firebase';
import { login } from '../../features/userSlide';

import ButtonPrimary from '../Button/primary';
import ButtonSecondary from '../Button/secondary';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import './Signup.scss';

const Signup: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fName, setFName] = useState<string>('');
  const [lName, setLName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const signUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth: UserCredential) => {
        if (userAuth && userAuth.user) {
          updateProfile(userAuth.user, {
            displayName: fName,
          }).then(() => {
            dispatch(
              login({
                uid: userAuth.user.uid,
                displayName: fName,
                email: userAuth.user.email,
              })
            );

            navigate('/tesla-account');
          });
        }
      })
      .catch((error: AuthError) => setError(error.message));
  };
  return (
    <div className="signup">
      <div className="signup__header">
        <div className="signup__logo">
          <Link to="/">
            <img
              src="https://assets.website-files.com/5e8fceb1c9af5c3915ec97a0/5ec2f037975ed372da9f6286_Tesla-Logo-PNG-HD.png"
              alt=""
            />
          </Link>
        </div>

        <div className="signup__language">
          <LanguageOutlinedIcon /> <span>en-US</span>
        </div>
      </div>

      <div className="signup__info">
        <h1>Create Account</h1>

        <form className="signup__form" onSubmit={signUp}>
          <label htmlFor="fName">First Name</label>
          <input
            id="fName"
            type="text"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            required
          />

          <label htmlFor="lName">Last Name</label>
          <input
            id="lName"
            type="text"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error ? <p className="signup__error">{error}</p> : null}

          <ButtonPrimary name="Create Account" type="submit" />
        </form>

        <div className="login__divider">
          <hr /> <span>OR</span> <hr />
        </div>

        <Link to="/login">
          <ButtonSecondary name="Sign In" />
        </Link>
      </div>
    </div>
  );
};

export default Signup;
