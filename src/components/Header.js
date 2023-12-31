// 在 src/components/Header.js
import React from 'react';
import flag from '../assets/svg/us_flag.svg';
import '../assets/style/header.css';

function Header() {
  return (
    <header className="Header">
      <nav className="Nav">
        <img src={flag} className="Flag" alt="flag" />

        <a href = "/home">Trending</a>
        <a href = "/language">State</a>
        <a href = "/daily">DailyReport</a>
        <a href = "/update">UpdatingTweets</a>
        <a href = "/test">Predict</a>


      </nav>
    </header>
  );
}

export default Header;
