import Button from "../../components/Button"
import { EnvelopeIcon, CodeBracketIcon, LinkIcon } from "@heroicons/react/24/outline";

interface Props {
    user: any,
    setEdit: (value: boolean) => void;
}

const Info = ({user, setEdit}: Props) => {
    return (
        <div className="profile__left">
            <img className="profile__avatar" src={user.avatar} />
            <p className="profile__name">{user.name}</p>
            <div className="profile__stats">
                <p><span className="profile__num">{user.followers.length}</span> followers</p>
                <p><span className="profile__num">{user.following.length}</span> following</p>
            </div>
            <Button 
                text="Edit Profile"
                color="secondary"
                onclick={() => setEdit(true)}
            />
            {user.about && 
            <div>
                <p className="profile__about-heading">About</p>
                <p className="profile__about">{user.about}</p>
            </div>
            }
            {user.publicEmail && 
            <div className="profile__link">
                <EnvelopeIcon className="icon-x-small" />
                <a href={`mailto:${user.publicEmail}`} target="_blank"className="profile__url">{user.publicEmail}</a>
            </div>
            }
            {user.github && 
            <div className="profile__link">
                <CodeBracketIcon className="icon-x-small" />
                <a href={user.github} target="_blank"className="profile__url">{user.github}</a>
            </div>
            }
            {user.website && 
            <div className="profile__link">
                <LinkIcon className="icon-x-small" />
                <a href={user.website} target="_blank"className="profile__url">{user.website}</a>
            </div>
            }
        </div>
    )
}

export default Info
