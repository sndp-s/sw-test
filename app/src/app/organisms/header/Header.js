import React from 'react';

import "./Header.scss";

import Navbar from '../../molecules/navbar/Navbar'
import MenuList from '../../molecules/menu-list/MenuList';

import logo from '../../../assets/img/logo.png';

class Header extends React.Component {
  render() {
    return (
      <div className='header'>
        <div className='container'>
          <div className='header__content-wrapper'>
            <Navbar />
            <div className='logo-wrapper'>
              <img src={logo} alt='logo' />
            </div>
            <MenuList />
          </div>
        </div>
      </div>
    );
  }
}

export class HeaderOffset extends React.Component {
  render() {
    return (<div className="Header-offset"/>);
  }
}

export default Header;