import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo-jde1.png';
import './Navbar.css';

const Navbar = () => {
  

  return (
    <nav>
      <img src={Logo} alt="jde logo" />
      <div className='links'>
       
          <Link className='link-login' to='/'>
            Login
          </Link>
      </div>
    </nav>
  );
};

export default Navbar;
