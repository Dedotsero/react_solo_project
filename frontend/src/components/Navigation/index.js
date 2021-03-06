// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormPage';
import SignupFormModal from "../SignupFormPage"
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <div>

        </div>
        <div>

        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <div className="nav">
      <ul className="nav-container">
        <li className='home-link'>
          <NavLink exact to="/">
            <button id="home-button">
              <i class="fas fa-home"></i>
            </button>
          </NavLink>
          <NavLink to="/albums">
                <button id="albums-button">
                  Albums
                </button>
          </NavLink>
          <ProfileButton user={sessionUser} />
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
