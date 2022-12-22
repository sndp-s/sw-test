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
            <div className="center">
              <div className='logo-wrapper'>
                <img src={logo} alt='logo' />
              </div>
            </div>
            <div className='last'>
              <MenuList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;