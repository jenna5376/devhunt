import ProjectCard from "./ProjectCard";

interface Post extends Document {
    title: string;
    creator: string;
    tags: string[];
    githubLink: string;
    demoLink?: string;
    // selectedFile: string;
    viewCount: number;
    likeCount: number;
    createdAt: Date;
    _id: string;
}

interface Props {
    projects: Array<Post>;
    user?: any;
}

const Projects = ({projects, user}: Props) => {
  return (
    <section className="projects">
        {projects.map((project) => {
        return (
            <ProjectCard 
                postId={project._id || ""}
                image="" 
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
