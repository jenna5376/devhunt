import { Link } from "react-router-dom";
import { HeartIcon, EyeIcon } from '@heroicons/react/24/outline'

interface Props {
    id: string;
    image: string;
    title: string;
    name: string;
    avatarUrl: string;
    userId: string;
};

const ProjectCard = ({ id, image, title, name, avatarUrl, userId }: Props) => {
    return (
        <Link to={`/project/${id}`} key={id}>
            <div className="project-card">
                <div className="project-card__img">
                    <img src={image} />
                    <div className="project-card__avatar">
                    <img src={avatarUrl} />
                </div>
                </div>
                <div className="project-card__stats">
                    <div className="project-card__stat">
                        <HeartIcon className="icon-x-small" />
                        <p>likes</p>
                    </div>
                    <div className="project-card__stat">
                        <EyeIcon className="icon-x-small" />
                        <p>views</p>
                    </div>
                </div>
                <p className="project-card__title">{title}</p>
            </div>
        </Link>
    )
}

export default ProjectCard
