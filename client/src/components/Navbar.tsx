import logoBlack from '../assets/logo-black.svg'
import { Link } from 'react-router-dom'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const session = {};
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
          {session ? (
            <>
              <Link to='/upload'>Upload Work</Link>
              Userphoto
              <Link to='/sign-up'>Sign Up</Link>
            </>
          ) : (
            <>AuthProviders</>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
