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
	const [liked, setLiked] =  useState<Array<String>>([]);
	const [selected, setSelected] = useState("Discover")

	console.log(projects)
	
	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await axios.get("http://localhost:4000/posts");
				setProjects(response.data);
			} catch (err) {
			console.log(err);
		}}
		fetchProjects();
		
		if (!user) return

		const fetchLikedProjects = async () => {
			console.log('fetching')
			try {
				const response = await axios.get(`http://localhost:4000/posts/liked/ids/${user._id}`);
				setLiked(response.data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchLikedProjects()
	}, []);
	

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
				liked={liked}
				setLiked={setLiked}
			/>
		</main>
	)
}

export default Home