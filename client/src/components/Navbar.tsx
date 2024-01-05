import logoBlack from "../assets/logo-black.svg"
import { Link } from "react-router-dom"
import { useState } from "react";
import { Bars2Icon, MagnifyingGlassIcon, PlusIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import Menu from "./Menu";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { User } from "../models/models"; 

interface Props{
	user?: User
}

const Navbar = ({user}: Props) => {
	const [displayMenu, setDisplayMenu] = useState(false)
	const navigate = useNavigate()

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
			<>
			{user ? 
				(
					<ul className="nav__links">
					{/* <div className="icon-btn">
						<SunIcon className="icon-small"/>
					</div>  */}
						<Button color="primary" onclick={()=>navigate("/upload")} text="Upload" />
						<div className="nav__menu nav__menu--auth" onClick={()=>{setDisplayMenu(!displayMenu)}}>
						<img className="nav__avatar" src={user.avatar} />
						<Bars2Icon className="icon-small" />
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
						<Button color="tertiary" onclick={()=>navigate("/sign-up")} text="Upload" />
						<Button onclick={()=>navigate("/sign-up")} text="Sign Up" />
						<div className="nav__menu" onClick={()=>{setDisplayMenu(!displayMenu)}}>
							<Bars2Icon className="icon-small" />
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
		</header>
	)
}

export default Navbar
