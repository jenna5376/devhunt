import logoBlack from '../assets/logo-black.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { Bars2Icon, MagnifyingGlassIcon, PlusIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import Menu from './Menu';
import Button from './Button';
import IconButton from './IconButton';

interface Props{
  user: any
}

const Navbar = ({user}: Props) => {
  const [displayMenu, setDisplayMenu] = useState(false)
  console.log(user)
  const logout = () => {
    window.open("http://localhost:4000/auth/signout", "_self");
  };
  return (
    <header className='nav'>
      <div className='nav__left'>
        <Link to='/'>
          <img src={logoBlack} />
        </Link>
        <div className='nav__search'>
          <MagnifyingGlassIcon className='nav__search__icon icon-x-small' />
          <input className='nav__search__input' type='text' placeholder='Search'/>
        </div>
      </div>
      <nav>
        {/* <ul>
          <li>
            <a>
              
            </a>
          </li>
        </ul> */}
        <div>
          {displayMenu ? (
            <Menu />
          ):(
            ''
          )}
          {user ? (
            <>
              <Link to='/upload'>Upload Work</Link>
              <img className='icon-small' />
              <div className='nav__menu' onClick={()=>{setDisplayMenu(!displayMenu)}}>
                <Bars2Icon className='icon-small' />
              </div>
              <li className="listItem" onClick={logout}>
                Logout
              </li>
            
            </>
          ) : (
            <Link to='/sign-up'>Sign Up</Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
