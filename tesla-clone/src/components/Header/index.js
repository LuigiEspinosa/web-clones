import { Link } from "react-router-dom";
import "./Header.css";

import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

function Header({ isMenuOpen, setIsMenuOpen }) {
  return (
    <div className="header">
      <div className="header__logo">
        <Link to="/">
          <img
            className="header__logoImg"
            src="https://assets.website-files.com/5e8fceb1c9af5c3915ec97a0/5ec2f037975ed372da9f6286_Tesla-Logo-PNG-HD.png"
            alt=""
          />
        </Link>
      </div>

      <nav className="header__links" aria-label="Product Links">
        <Link to="/">Model S</Link>
        <Link to="/">Model 3</Link>
        <Link to="/">Model X</Link>
        <Link to="/">Model Y</Link>
        <Link to="/">Solar Roof</Link>
        <Link to="/">Solar Panels</Link>
      </nav>

      <nav className="header__right" aria-label="Main Links">
        <Link to="/" className={isMenuOpen ? "header__link--hidden" : undefined}>
          Shop
        </Link>
        <Link to="/login" className={isMenuOpen ? "header__link--hidden" : undefined}>
          Tesla Account
        </Link>

        <div className="header__menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </nav>
    </div>
  );
}

export default Header;
