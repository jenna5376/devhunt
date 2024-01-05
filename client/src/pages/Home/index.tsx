import Categories from "./Categories"
import { useEffect, useState } from "react";
import axios from "axios";
import arrow from "../../assets/pixel-arrow.svg"
import Projects from "../../components/Projects";
import { User } from "../../models/models"

import { Post } from "../../models/models";

interface Props {
	user?: User
}

const Home = ({user}: Props) => {
	const [projects, setProjects] = useState<Array<Post>>([]);
	const [selected, setSelected] = useState("Discover")

	const [owner, setOwner] = useState("mongodb-developer")
	const [repo, setRepo] = useState("mern-stack-example")

	type ProjectDet = {
        title: string;
        date: number;
        github: string;
        image: string;
        website: string;
        readmeMd: string;
        readme: boolean;
		tags: [];
		contributors: [];
    };

    const [projectDet, setProjectDet] = useState<ProjectDet>({
        title: '',
        date: Date.now(),
        github: '',
        image: '',
        website: '',
        readmeMd: '',
        readme: false,
		tags: [],
		contributors: []
    })


	const fetchData = () => {
		//repo readme
		fetch(`https://api.github.com/repos/${owner}/${repo}/readme`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
				console.log(decodeURIComponent(atob(data.content)));
			});

		fetch(`https://api.github.com/repos/${owner}/${repo}/languages`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
			});

		fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
			});
			
		fetch(`https://api.github.com/repos/${owner}/${repo}/topics`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data.names)
			});
	}
	
	useEffect(() => {
		fetchData()
	  }, [])




	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await axios.get("http://localhost:4000/posts");
				setProjects(response.data);
			} catch (err) {
			console.log(err);
		}}
			fetchProjects();
	});

	return (
		<main>
			<section className="hero">
				<div className="hero__text">
				<h1 className="hero__heading">Discover and showcase coding projects</h1>
				<p className="hero__subheading">Find inspirations and references for your next coding project with our collection of projects with source code</p>
				</div>
				<div className="hero__arrow">
				<img src={arrow} />
				<p>Get Inspired</p>
				</div>
			</section>
			<section className="filter">
				<Categories 
					selected={selected}
					setSelected={setSelected}
				/>
			</section>
			<Projects
				projects={projects}
				user={user}
			/>
		</main>
	)
}

export default Home