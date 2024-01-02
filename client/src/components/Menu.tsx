import MenuItem from "./MenuItem"
import { menuItems } from "../constant"

const Menu = () => {
  return (
    <div className='menu'>
        <div className="menu__user">
            <p className="menu__name">Jenna Han</p>
            <p className="menu__email">jennahan@nyu.edu</p>
        </div>
        <div className="menu__internal">
            {menuItems.slice(0,3).map(link => {
                console.log(link.iconLeft)
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
        {menuItems.slice(3,6).map(link => {
                return (
                    <MenuItem 
                        title={link.title}
                        link={link.link}
                        external={link.external}
                        iconRight={link.iconRight}
                    />
                )
            })}
        </div>
    </div>
  )
}

export default Menu
