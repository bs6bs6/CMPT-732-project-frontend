import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import logo from '../assets/svg/us_flag.svg';
import biden from '../assets/svg/joe-biden.svg';
import trump from '../assets/svg/trump.svg';
import '../assets/style/start.css';

function Start() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div className="Start">
      <header className="App-header">
        <img src={biden} className="App-side-image left" alt="biden" />
       
        <img src={logo} className="App-logo" alt="logo" />
        <Button variant="contained" color="primary" onClick={handleClick} style={{ borderRadius: '20px' }} >
          start
        </Button>
        <p>
          2020 US Election Final Round 
        </p>  
        <p>
        Tweets Analyse
        </p>
        <a
          className="App-link"
          href="https://github.com/bs6bs6/CMPT-732-final-project"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github Link
        </a>
        <img src={trump} className="App-side-image right" alt="trump" />
     
      </header>
    </div>
  );
}

export default Start;
