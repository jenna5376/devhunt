interface Props {
    title: string,
    link: string,
    iconLeft?: string,
    iconRight?: boolean,
    external: boolean
}

interface ConditionalWrapperProps {
    condition: boolean;
    wrapper1: (children: React.ReactNode) => React.ReactElement;
    wrapper2: (children: React.ReactNode) => React.ReactElement;
    children?: React.ReactNode;
}

import { Link } from "react-router-dom";

const MenuItem = ({title, link, iconLeft, iconRight, external}: Props) => {
    const ConditionalWrapper = ({ condition, wrapper1, wrapper2, children }: ConditionalWrapperProps) =>
    condition ? wrapper1(children) : wrapper2(children);
    
    return (
        <div className="menu-item">
            <ConditionalWrapper 
                condition={external}
                wrapper1={children => 
                    <a target='_blank' rel="noopener" href={link}>{children}</a>
                }
                wrapper2={children => 
                    <Link to={link}>{children}</Link>
                }
            >
                {iconLeft?<img className="menu-item__icon" src={iconLeft} /> : ""}
                <p className="menu-item__title">{title}</p>
                {iconRight?<img className="menu-item__icon" /> : ""}
            </ConditionalWrapper>
        </div>
    )
}

export default MenuItem
