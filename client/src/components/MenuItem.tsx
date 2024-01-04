interface Props {
    title: string,
    link: string,
    iconLeft?: any,
    iconRight?: boolean,
    external: boolean
}

import { ArrowUpRightIcon } from "@heroicons/react/20/solid"

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
        <>
            <ConditionalWrapper 
                condition={external}
                wrapper1={children => 
                    <a className="menu-item" target="_blank" rel="noopener" href={link}>{children}</a>
                }
                wrapper2={children => 
                    <Link className="menu-item" to={link}>{children}</Link>
                }
            >
                <p className="menu-item__title">{title}</p>
                {iconRight && <ArrowUpRightIcon className="icon-small" />}
            </ConditionalWrapper>
        </>
    )
}

export default MenuItem
