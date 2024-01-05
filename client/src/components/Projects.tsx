import ProjectCard from "./ProjectCard";

import { Post } from "../models/models";

interface Props {
    projects: Array<Post>;
    user?: any;
}

const Projects = ({projects, user}: Props) => {
  return (
    <section className="projects">
        {projects.map((project) => {
            console.log(project.image)
        return (
            <ProjectCard 
                postId={project._id || ""}
                image={project.image} 
                title={project.title}
                name="" 
                avatarUrl="" 
                user={user || ''}
                likes={project.likeCount}
                views={project.viewCount}
            />
        )
        })}
    </section>
    )
}

export default Projects
