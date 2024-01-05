import ProjectCard from "./ProjectCard";

import { Post } from "../models/models";

interface Props {
    projects: Array<Post>;
    user?: any;
    liked: Array<String>;
    setLiked: (val: Array<String>) => void
}

const Projects = ({projects, user, liked, setLiked}: Props) => {
    return (
    <section className="projects">
        {projects.map((project) => {
            return (
                <ProjectCard 
                    key={project._id}
                    postId={project._id}
                    image={project.image} 
                    title={project.title}
                    name="" 
                    avatarUrl="" 
                    user={user}
                    likes={project.likeCount}
                    views={project.viewCount}
                    liked={liked}
                    setLiked={setLiked}
                />
            )
        })}
    </section>
    )
}

export default Projects
