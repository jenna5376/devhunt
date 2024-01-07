import logoBlack from "../assets/logo-black.svg"
import logoWhite from "../assets/logo-white.svg"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { Bars2Icon, MagnifyingGlassIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import Menu from "./Menu";
import Button from "./Button";
import { useNavigate, useLocation } from "react-router-dom";
import { User } from "../models/models"; 

interface Props{
	user?: User,
	isDark: boolean,
	setIsDark: (val: boolean) => void
}


const Navbar = ({user, isDark, setIsDark}: Props) => {
	const [displayMenu, setDisplayMenu] = useState(false)
	const navigate = useNavigate()
	
	const location = useLocation();
	const path = location.pathname;
	const home =  (path == "/" || path.includes("post")) ? true : false;
	const display =  path == "/sign-up" ? false : true;

	console.log(location.pathname)

	return (
		<>
		{display && <header className={`nav ${home ? 'nav--home' : ''}`}>
			<div className="nav__left">
				<Link className="nav__logo" to="/">
					{isDark ? <img src={logoWhite} /> : <img src={logoBlack} />}
				</Link>
				<div className="nav__search">
					<MagnifyingGlassIcon className="nav__search__icon icon-x-small" />
					<input className="nav__search__input" type="text" placeholder="Search"/>
				</div>
			</div>
			<nav>
				<>
				{user ? 
					(
						<ul className="nav__links">
						<div className="icon-btn icon-btn--transparent" onClick={() => setIsDark(!isDark)}>
							{isDark ? 
								<MoonIcon className="icon-small"/>
								: 
								<SunIcon className='icon-small'/>
							}
						</div> 
							<Button color="primary" onclick={()=>navigate("/upload")} text="Upload" />
							<div className="nav__menu nav__menu--auth" onClick={()=>{setDisplayMenu(!displayMenu)}}>
							<img className="nav__avatar" src={user.avatar} />
							<Bars2Icon className="icon-small nav__icon" />
						</div>
						{displayMenu && 
							<Menu 
								displayMenu={displayMenu}
								setDisplayMenu={setDisplayMenu} 
								auth={true} 
							/> 
						}
					</ul>
					) 
					: 
					(
						<ul className="nav__links">
							<div className="icon-btn icon-btn--transparent" onClick={() => setIsDark(!isDark)}>
								{isDark ? 
									<MoonIcon className="icon-small theme-icon"/>
									: 
									<SunIcon className='icon-small theme-icon'/>
								}
							</div> 
							<Button color="tertiary" onclick={()=>navigate("/sign-up")} text="Upload" />
							<Button onclick={()=>navigate("/sign-up")} text="Sign Up" />
							<div className="nav__menu" onClick={()=>{setDisplayMenu(!displayMenu)}}>
								<Bars2Icon className="icon-small nav__menu-icon" />
							</div>
							{displayMenu && 
								<Menu 
									displayMenu={displayMenu}
									setDisplayMenu={setDisplayMenu} 
								/> 
							}
						</ul>
					)
				}
				</>
			</nav>
		</header>}
		</>
	)
}

export default Navbar
