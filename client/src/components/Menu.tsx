import MenuItem from "./MenuItem"
import { menuItems } from "../constant"

const Menu = () => {
    const logout = () => {
        window.open("http://localhost:4000/auth/signout", "_self");
    };

    return (
    <div className='menu'>
        <div className="menu__user">
            <p className="menu__name">Jenna Han</p>
            <p className="menu__email">jennahan@nyu.edu</p>
        </div>
        <div className="menu__internal">
            {menuItems.slice(0,3).map(link => {
                return (
                    <MenuItem 
                        title={link.title}
                        link={link.link}
                        external={link.external}
                        iconLeft={link.iconLeft}
                    />
                )
            })}
        </div>
        <div className="menu__external">
            {menuItems.slice(3,5).map(link => {
                return (
                    <MenuItem 
                        title={link.title}
                        link={link.link}
                        external={link.external}
                        iconRight={link.iconRight}
                    />
                )
            })}
            <div className="menu-item" onClick={logout}>
                <p className="menu-item__title">Sign Out</p>
            </div>
        </div>
    </div>
    )
}
export default Menu
