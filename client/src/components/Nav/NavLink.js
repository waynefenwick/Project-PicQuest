import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_USER, LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { QUERY_UNSPLASH_IMAGES } from '../../utils/queries';
import Search from '../Tabs/Search'; // Import the Search component

function NavLink() {
  const [isLoggedIn, setIsLoggedIn] = useState(Auth.loggedIn());
  const [activePopup] = useState(null);
  const [addUser] = useMutation(ADD_USER);
  const [login] = useMutation(LOGIN);
  const [activeLink, setActiveLink] = useState('home');
  const [userFormData, setUserFormdata] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const showPopup = (popupId) => {
    const popupElement = document.getElementById(popupId);
    if (popupElement) {
      popupElement.style.display = 'flex';
    }
  };

  const closePopup = (popupId) => {
    const popupElement = document.getElementById(popupId);
    if (popupElement) {
      popupElement.style.display = 'none';
    }
  };

  const handleNavLinkClick = (linkId) => {
    setActiveLink(linkId);
  };

  const handleLogIn = async () => {
    const mutationResponse = await login({
      variables: {
        email: userFormData.email,
        password: userFormData.password,
      },
    });

    const token = mutationResponse.data.login.token;
    Auth.login(token);
    setIsLoggedIn(true);
  };

  const handleSubmit = async () => {
    const mutationResponse = await addUser({
      variables: {
        firstName: userFormData.firstName,
        lastName: userFormData.lastName,
        email: userFormData.email,
        password: userFormData.password,
      },
    });

    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
    setIsLoggedIn(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserFormdata({
      ...userFormData,
      [name]: value,
    });
  };

  const performSearch = () => {
    if (searchQuery) {
      console.log('Performing search for:', searchQuery);
      // Perform the search or update state here
    }
  };

  const handleLogout = () => {
    Auth.logout();
    setIsLoggedIn(false);
  };
  return (
    <>
      <div id="navbar-container">

        <section id="navbar">
          <ul className="navbar-links">
            <li>
              <Link to="/" className={activeLink === 'home' ? 'active' : ''} onClick={() => handleNavLinkClick('home')}>Home</Link>
            </li>
            <li>
              <Link to="/tab1" className={activeLink === 'tab1' ? 'active' : ''} onClick={() => handleNavLinkClick('tab1')}>People</Link>
            </li>
            <li>
              <Link to="/tab2" className={activeLink === 'tab2' ? 'active' : ''} onClick={() => handleNavLinkClick('tab2')}>Animals</Link>
            </li>
            <li>
              <Link to="/tab3" className={activeLink === 'tab3' ? 'active' : ''} onClick={() => handleNavLinkClick('tab3')}>Nature</Link>
            </li>
            <li>
              <Link to="/tab4" className={activeLink === 'tab4' ? 'active' : ''} onClick={() => handleNavLinkClick('tab4')}>Oceans</Link>
            </li>
            <li>
              <Link to="/tab5" className={activeLink === 'tab5' ? 'active' : ''} onClick={() => handleNavLinkClick('tab5')}>Cities</Link>
            </li>
            <li>
              <Link to="/tab6" className={activeLink === 'tab6' ? 'active' : ''} onClick={() => handleNavLinkClick('tab6')}>Unusual</Link>
            </li>
            <li>
              <Link to="/tab7" className={activeLink === 'tab7' ? 'active' : ''} onClick={() => handleNavLinkClick('tab7')}>Relaxing</Link>
            </li>
            <li>
              <Link to="/tab8" className={`tab-link ${activeLink === 'tab8' ? 'active' : ''}`}onClick={() => handleNavLinkClick('tab8')}>Search</Link>
            </li>
          </ul>
          <div className="navbar-search">
            <input
              type="text"
              placeholder="Searching for..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
        </section>

        <div id="navbar-overlay"></div>

        <section id="navbar-buttons">

          <div className="navbar-login-signup">
            {isLoggedIn ? (
              <button className="logout-button" onClick={handleLogout}>
                Log Out
              </button>
            ) : (
              <>
                <button className="login-button" onClick={() => showPopup('loginPopup')}>
                  Log In
                </button>
                <button className="signup-button" onClick={() => showPopup('signupPopup')}>
                  Sign Up
                </button>
              </>
            )}
          </div>
        </section>
      </div>

      <section className={`popup ${activePopup ? 'active' : ''}`} id="loginPopup">
        <div className="popup-content">
          <h2>Log In</h2>
          <input name="email" id="email" type="text" placeholder="Email" onChange={handleChange} />
          <input name="password" id="password" type="password" placeholder="Password" onChange={handleChange} />
          <button onClick={handleLogIn}>Log In</button>
          <span className="close" onClick={() => closePopup('loginPopup')}>
            &times;
          </span>
        </div>
      </section>

      <section className={`popup ${activePopup ? 'active' : ''}`} id="signupPopup">
        <div className="popup-content">
          <h2>Sign Up</h2>
          <input name="firstName" id="signUpFirstName" type="text" placeholder="FirstName" onChange={handleChange} />
          <input name="lastName" id="signUpLastName" type="text" placeholder="LastName" onChange={handleChange} />
          <input name="email" id="signUpEmail" type="email" placeholder="Email" onChange={handleChange} />
          <input name="password" id="signUpPassword" type="password" placeholder="Password" onChange={handleChange} />
          <button onClick={handleSubmit}>Sign Up</button>
          <span className="close" onClick={() => closePopup('signupPopup')}>
            &times;
          </span>
        </div>
      </section>
      <Search searchQuery={searchQuery} />
    </>
  );
}
export default NavLink;
