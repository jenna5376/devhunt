import MenuItem from "./MenuItem"
import { menuItems } from "../constant"
import { useRef } from "react"

interface Props {
    displayMenu: boolean,
    setDisplayMenu: (value: boolean) => void,
    auth?: boolean
}

const Menu = ({displayMenu, setDisplayMenu, auth}: Props) => {
    const menu = useRef<HTMLDivElement>(null)
    const closeMenu = (evt: MouseEvent)=>{
        if (menu.current == null) return;
        
        if(displayMenu && !menu.current?.contains(evt.target as Node)){
            console.log(evt.target)
            console.log('hiding')
            setDisplayMenu(false)
        }
    }
    document.addEventListener('mousedown', closeMenu)
    
    const logout = () => {
        window.open("http://localhost:4000/auth/signout", "_self");
    };

    return (
    <div className="menu" ref={menu}>
        {auth && <>
            <div className="menu__user">
                <p className="menu__name">Jenna Han</p>
                <p className="menu__email">jennahan@nyu.edu</p>
            </div>
            <div className="menu__internal">
                {menuItems.slice(0,2).map(link => {
                    return (
                        <MenuItem 
                            title={link.title}
                            link={link.link}
                            external={link.external}
                            iconLeft={link.iconLeft}
                            setDisplayMenu={setDisplayMenu}
                        />
                    )
                })}
            </div>
        </>}
        <div className="menu__external">
            {menuItems.slice(3,5).map(link => {
                return (
                    <MenuItem 
                        title={link.title}
                        link={link.link}
                        external={link.external}
                        iconRight={link.iconRight}
                        setDisplayMenu={setDisplayMenu}
                    />
                )
            })}
            {auth && <div className="menu-item" onClick={logout}>
                <p className="menu-item__title">Sign Out</p>
            </div>}
        </div>
    </div>
    )
}
export default Menu