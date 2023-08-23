import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";

import { auth } from "../../firebase";
import { logout, selectUser } from "../../features/userSlice";

import Car from "../Car";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import "./TeslaAccount.css";

function TeslaAccount({ isMenuOpen, setIsMenuOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);

  const logoutOfApp = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="teslaAccount">
      <div className="teslaAccount__header">
        <div className="teslaAccount__logo">
          <Link to="/">
            <img
              src="https://assets.website-files.com/5e8fceb1c9af5c3915ec97a0/5ec2f037975ed372da9f6286_Tesla-Logo-PNG-HD.png"
              alt=""
            />
          </Link>
        </div>

        <div className="teslaAccount__links">
          <Link to="/tesla-account">Model S</Link>
          <Link to="/tesla-account">Model 3</Link>
          <Link to="/tesla-account">Model X</Link>
          <Link to="/tesla-account">Model Y</Link>
          <Link to="/tesla-account">Solar Roof</Link>
          <Link to="/tesla-account">Solar Panels</Link>
          <Link to="/tesla-account">Shop</Link>
          <Link to="/tesla-account">Tesla Account</Link>
          <Link onClick={logoutOfApp}>Log out</Link>

          <div className="teslaAccount__menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <CloseIcon className="teslaAccount__closeMenu" /> : <MenuIcon />}
          </div>
        </div>
      </div>

      <div className="teslaAccount__info">
        <div className="teslaAccount__person">
          <h4>{user?.displayName + "'s"} Tesla</h4>
        </div>

        <div className="teslaAccount__infoRight">
          <Link>Home</Link>
          <Link>Account</Link>
          <Link>History</Link>
          <Link onClick={logoutOfApp}>Sign out</Link>
        </div>
      </div>

      <div className="teslaAccount__car">
        <Car
          imgSrc="https://www.tesla.com/tesla_theme/assets/img/mytesla/v3/header-nocar-models@2x.jpg?20170815"
          model="model s"
          testDrive
        />
        <Car
          imgSrc="https://www.tesla.com/tesla_theme/assets/img/mytesla/v3/header-nocar-modelx@2x.jpg?20170815"
          model="model x"
        />
      </div>
    </div>
  );
}

export default TeslaAccount;
