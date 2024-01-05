import dIconBlack from "../assets/devfolio-icon-black.svg"
import dIconWhite from "../assets/devfolio-icon-white.svg"
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const path = location.pathname;
  const display =  path == "/sign-up" ? false : true;

  return (
    <>
      { display &&
        <footer className="footer">
        <p className="footer__left">© 2024 Devhunt. All rights reserved.</p>
        <img className="footer__icon" src={dIconBlack} />
        {/* <p className="footer__right"><span className="footer__count">1020</span> dev projects</p> */}
        </footer>
      }
    </>
  )
}

export default Footer
