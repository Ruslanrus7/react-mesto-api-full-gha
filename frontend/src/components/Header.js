import logo from '../images/logo.svg';
import React from 'react';
import {Link, Routes, Route} from 'react-router-dom';

function Header ({loggedEmail}) {

  function signOut () {
    localStorage.removeItem('jwt');
  }

  return (
    <header className="header page__header">
      <img src={logo} alt="логотип" className="header__logo" />
      <Routes>
        <Route path='signin' element={<Link className='header__nav' to='/signup'>Регистрация</Link>} />
        <Route path='signup' element={<Link className='header__nav'  to='/signin'>Войти</Link>} />
        <Route path='/' element={
          <div className='header__box'>
            <p className='header__email'>{loggedEmail}</p>
            <Link onClick={signOut} className='header__nav header_color_grey' to='/signin'>Выйти</Link>
          </div>
          }/>
      </Routes>
    </header>
    )
}

export default Header;
