import { Navbar, Nav, NavLink } from 'react-bootstrap';
import "../../css/secondnav.css";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const SecondNavbar = () => {
  const { t } = useTranslation();
  return (
    <Navbar expand="lg" className="bg">
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link o" to="/">
            {t('Home')}
          </Link>
          <Link className="nav-link o" to="/program">
            Programs
          </Link>
          <Link className="nav-link o" to="/dining">
            Dining
          </Link>
        </Nav>
        <Navbar.Brand className="text-center ml-5">
          <Link to="/">
            <img src="./logo.png" className="logo" alt="Logo" />
          </Link>
        </Navbar.Brand>
        <Nav className="ml-auto">
          
           <NavLink className="nav-link o" to="/contact">
            Contact Us
          </NavLink> 
          <NavLink className="nav-link o" to="/membership">
            Membership
          </NavLink>
          <Link className="nav-link o mr-3" to="/reservation">
            Reservations
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default SecondNavbar;
