// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button id="profile-dropdown-button"onClick={openMenu}>
        <i className="fas fa-user"></i>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <div id="dropdown-user-info">
            <li>Welcome,</li>
            <li id="dropdown-username">{user.username}</li>
            <li>
              <button id="profile-button">
                Profile
              </button>
            </li>
          </div>
          <div id="dropdown-logout">
            <li>
              <button id="logout-button" onClick={logout}>Log Out</button>
            </li>
          </div>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
