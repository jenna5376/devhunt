import arrow from '../../assets/pixel-arrow.svg'
import ProjectCard from './ProjectCard'
import Categories from './Categories'
import { useEffect, useState } from 'react';
import axios from "axios";
import Menu from '../../components/Menu';

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
}

const Home = () => {
  const [projects, setProjects] = useState<Array<Post>>([]);
  const [selected, setSelected] = useState("Discover")

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:4000/posts");
        setProjects(response.data);
        console.log(response.data)
      } catch (err) {
        console.log(err);
      }
    };

    fetchProjects();
  }, [])
  return (
    <main>
      <Menu />
      <section className='hero'>
        <div className='hero__text'>
          <h1 className='hero__heading'>Discover and showcase coding projects</h1>
          <p className='hero__subheading'>Find inspirations and references for your next coding project with our collection of projects with source code</p>
        </div>
        <div className='hero__arrow'>
          <img src={arrow} />
          <p>Get Inspired</p>
        </div>
      </section>
      <section className='filter'>
          <Categories 
            selected={selected}
            setSelected={setSelected}
          />
      </section>
      <section className='projects'>
        {projects.map((project) => {
          console.log(project)
          return (
            <ProjectCard 
              id=""
              image='' 
              title={project.title}
              name='' 
              avatarUrl='' 
              userId=''
            />
          )
        })}
      </section>
    </main>
  )
}

export default Home
