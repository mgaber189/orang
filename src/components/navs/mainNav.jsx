import React, { useState, useEffect, useContext } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaUser } from 'react-icons/fa';
import { Navbar, Nav, NavLink, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../css/firstnav.css';
import '../../css/secondnav.css';
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import arTranslation from '../../translations/ar.json';
import enTranslation from '../../translations/en.json';
import { AuthContext } from '../context/AuthContext';
import logo from "./logo.png"
import { BookContext } from '../context/BookContext';

i18n.use(initReactI18next).init({
  resources: {
    ar: {
      translation: arTranslation,
    },
    en: {
      translation: enTranslation,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});

const MainNavbar = () => {
  const { t } = useTranslation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const auth = useContext(AuthContext)
  const book = useContext(BookContext)
  const token=localStorage.getItem("token")
  useEffect(() => {
    // Check if user data exists in local storage
    // const userData = localStorage.getItem('userData');
    if (token) {
      setLoggedIn(true);
      setUserName(auth.userName);
    }
  }, []);

  // const handleSignIn = () => {
  //   // Perform sign-in logic here
  //   const userData = {
  //     userName: userName, // Replace with actual user name
  //   };
  //   localStorage.setItem('userData', JSON.stringify(userData));
  //   setLoggedIn(true);
  //   setUserName(userData.userName);
  //   // window.location.reload();
  // };

  const handleSignOut = () => {
    // Perform sign-out logic here
    auth.logout();
    localStorage.removeItem('userData');
    setLoggedIn(false);
    setUserName('');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="blue-background">
     
        {/* First Navbar */}
        <Navbar expand="lg" className="first-navbar">
          <Navbar.Toggle aria-controls="combined-navbar-nav" />
          <Navbar.Collapse id="combined-navbar-nav">
            <Nav className="mr-auto">
              <Nav className="nav-link ">
                <a href="https://www.facebook.com/orange.bay.hurghada/?locale=ar_AR">
                  <FaFacebook className="icon" />
                </a>
                <a href="https://www.instagram.com/orangebayhurghada/">
                  <FaInstagram className="icon" />
                </a>
                <a href="https://twitter.com/kemetland_/status/1276653702628225024?lang=ar">
                  <FaTwitter className="icon" />
                </a>
              </Nav>
            </Nav>

            <Nav className="ml-3">
              <NavDropdown title={t('currency')} id="basic-nav-dropdown" className="nav-dropdown">
                <NavDropdown.Item className="hh" href="#">
                USD
                </NavDropdown.Item>
                {/* <NavDropdown.Item className="hh" href="#">
                  {t('USD')}
                </NavDropdown.Item> */}
              </NavDropdown>

              <NavDropdown title={t('language')} id="language-dropdown" className="nav-dropdown">
                <NavDropdown.Item className="hh" onClick={() => changeLanguage('ar')}>
                  العربية
                </NavDropdown.Item>
                <NavDropdown.Item className="hh" onClick={() => changeLanguage('en')}>
                  English
                </NavDropdown.Item>
              </NavDropdown>

              {token ? (
                <NavDropdown
                  title={<><FaUser /> {auth?.fullName}</>}
                  id="profile-dropdown"
                  className="nav-dropdown mr-5  ptofile-drop"
                >
                  <NavDropdown.Item className="hh" href="#">
                    <Link to='/profile' className="hh">
                    {t('Profile')}
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item className="hh m" href="#">
                    <Link to='/reservation' className="hh">
                    {t('Reservations')}
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item className="hh " onClick={handleSignOut}>
                   <Link className="hh ">
                    {t('signOut')}
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to="/signin" >
                  <button className="admission ">
                    {t('signin')}
                  </button>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {/* Second Navbar */}
       
        <Navbar expand="lg" className="second-navbar bg">
          <Navbar.Toggle aria-controls="second-navbar-nav" />
          {/* <Container> */}
          <Navbar.Collapse id="second-navbar-nav">
          
            <Nav className="mr-auto">
              <NavLink as={Link} to="/" className="nav-link o ml-4">
                {t('Home')}
              </NavLink>
              <NavLink onClick={()=>{book.addBook({ bookingDate: null })}} as={Link} to="/program" className="nav-link o">
                Programs
              </NavLink>
            
                <NavLink as={Link} to="/membership" className="nav-link o">
                Membership
              </NavLink>
              <NavLink as={Link} to="/dining" className="nav-link o">
                Dining
              </NavLink>
              
            </Nav>
            <Navbar.Brand className="text-center ml-5">
              <Link to="/">
                <img src={logo} className="logo" alt="Logo" />
              </Link>
            </Navbar.Brand>
            <Nav className="ml-auto">
           
          
            
              <NavLink as={Link} to="/gallery" className="nav-link o">
               Gallery
              </NavLink>
              <NavLink as={Link} to="/videos" className="nav-link o">
               Videos
              </NavLink>
              <NavLink as={Link} to="/aboutus" className="nav-link o">
                About Us
              </NavLink> 
              <NavLink as={Link} to="/contactus" className="nav-link o mr-4">
                Contact Us
              </NavLink>
             
            </Nav>
          </Navbar.Collapse>
          {/* </Container> */}
        </Navbar>
      
    </div>
  );
};

export default MainNavbar;
