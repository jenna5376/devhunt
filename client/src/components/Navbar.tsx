import logoBlack from "../assets/logo-black.svg"
import { Link } from "react-router-dom"
import { useState } from "react";
import { Bars2Icon, MagnifyingGlassIcon, PlusIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import Menu from "./Menu";
import Button from "./Button";

interface Props{
	user: any
}

const Navbar = ({user}: Props) => {
	const [displayMenu, setDisplayMenu] = useState(false)
	console.log(user)

	return (
		<header className="nav">
		<div className="nav__left">
			<Link to="/">
			<img src={logoBlack} />
			</Link>
			<div className="nav__search">
			<MagnifyingGlassIcon className="nav__search__icon icon-x-small" />
			<input className="nav__search__input" type="text" placeholder="Search"/>
			</div>
		</div>
		<nav>
			{displayMenu && <Menu setDisplayMenu={setDisplayMenu} /> }
			<>
			{user ? 
				(
				<ul className="nav__links">
					<div className="icon-btn">
					<SunIcon className="icon-small"/>
					</div> 
					<Link to="/upload">Upload</Link>
					<div className="nav__menu nav__menu--auth" onClick={()=>{setDisplayMenu(!displayMenu)}}>
					<img className="nav__avatar" src={user.avatar} />
					<Bars2Icon className="icon-small" />
					</div>
				</ul>
				
				) 
				: 
				(
				<Link to="/sign-up">Sign Up</Link>
				)
			}
			</>
		</nav>
		</header>
	)
}

export default Navbar
