import React from 'react';
import './Header.css';

interface HeaderProps {
  currentUser: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLogout }) => {
  return (
    <header className="header">
      <div className="header-content">
        <span className="user-name">Logged in as: {currentUser}</span>
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
