import React, { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaUser } from 'react-icons/fa';
import { Navbar, Nav, NavLink, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../css/firstnav.css';
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import arTranslation from '../../translations/ar.json';
import enTranslation from '../../translations/en.json';

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

const Navs = () => {
  const { t } = useTranslation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check if user data exists in local storage
    const userData = localStorage.getItem('userData');
    if (userData) {
      const { userName } = JSON.parse(userData);
      setLoggedIn(true);
      setUserName(userName);
    }
  }, [userName]);

  const handleSignIn = () => {
    // Perform sign-in logic here
    const userData = {
      userName: userName, // Replace with actual user name
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    setLoggedIn(true);
    setUserName(userData.userName);
  };

  const handleSignOut = () => {
    // Perform sign-out logic here
    localStorage.removeItem('userData');
    setLoggedIn(false);
    setUserName('');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Navbar expand="md" className="n">
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav className="nav-link">
            
            <a href="https://www.facebook.com">
              <FaFacebook className="icon" />
            </a>
            <a href="https://www.instagram.com">
              <FaInstagram className="icon" />
            </a>
            <a href="https://www.twitter.com">
              <FaTwitter className="icon" />
            </a>
          </Nav>
        </Nav>

        <Nav className="ml-auto">
          <NavDropdown title={t('currency')} id="basic-nav-dropdown" className="nav-dropdown">
            <NavDropdown.Item className="hh" href="#">
            USD
            </NavDropdown.Item>
            <NavDropdown.Item className="hh" href="#">
              {t('USD')}
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title={t('language')} id="language-dropdown" className="nav-dropdown">
            <NavDropdown.Item className="hh" onClick={() => changeLanguage('ar')}>
              العربية
            </NavDropdown.Item>
            <NavDropdown.Item className="hh" onClick={() => changeLanguage('en')}>
              English
            </NavDropdown.Item>
          </NavDropdown>

          {loggedIn ? (
            <NavDropdown
              title={<><FaUser /> {userName}</>}
              id="profile-dropdown"
              className="nav-dropdown"
            >
              <NavDropdown.Item className="hh" href="#">
                {t('myProfile')}
              </NavDropdown.Item>
              <NavDropdown.Item className="hh" href="#">
                {t('myReservations')}
              </NavDropdown.Item>
              <NavDropdown.Item className="hh" onClick={handleSignOut}>
                {t('signOut')}
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Link to="/signin">
              <button className="admission" onClick={handleSignIn}>
                {t('signin')}
              </button>
            </Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navs;
