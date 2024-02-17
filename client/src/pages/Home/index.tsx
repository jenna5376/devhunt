import Categories from "./Categories"
import { useEffect, useState } from "react";
import axios from "axios";
import arrow from "../../assets/pixel-arrow.svg"
import arrowDark from "../../assets/pixel-arrow-dark.svg"
import Projects from "../../components/Projects";
import { User } from "../../models/models"
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import circlesRight from "../../assets/circles-right.png"
import circlesLeft from "../../assets/circles-left.png"
import circlesRightDark from "../../assets/circles-right-dark.png"
import circlesLeftDark from "../../assets/circles-left-dark.png"
import circles from "../../assets/circles-dark.png"

import { Post } from "../../models/models";

interface Props {
	user?: User,
	isDark: boolean,
	update: Date,
	setUpdate: (val: Date) => void;
}

const Home = ({user, isDark, update, setUpdate}: Props) => {
	const [projects, setProjects] = useState<Array<Post>>([]);
	const [filteredProjects, setFilteredProjects] = useState<Array<Post>>([]);
	const [liked, setLiked] =  useState<Array<String>>([]);
	const [selected, setSelected] = useState("Discover")
	
	useEffect(() => {
		console.log("updated value",update)
		const fetchProjects = async () => {
			try {
				const response = await axios.get("http://localhost:4000/posts");
				setProjects(response.data);
				setFilteredProjects(response.data);
			} catch (err) {
			console.log(err);
		}}
		fetchProjects();
		
		if (!user) return

		const fetchLikedProjects = async () => {
			try {
				const response = await axios.get(`http://localhost:4000/posts/liked/ids/${user._id}`);
				setLiked(response.data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchLikedProjects()
	}, [update]);

	useEffect(()=>{
		if (selected === "Discover") {
			return setFilteredProjects(projects)
		}

		setFilteredProjects(projects.filter((project) => project.category === selected))
	}, [selected])
	

	return (
		<main>
			<div className={`squares ${isDark ? 'squares--dark' : ''}`}>
				<div className="square square--1"></div>
				<div className="square square--2"></div>
				<div className="square square--3"></div>
				<div className="square square--4"></div>
				<div className="square square--5"></div>
			</div>
			{isDark ? 
			<>
				<img className="circle-dark" src={circles} />
			</>
			:
			<div className="circles-light">
				<img className="circle-light" src={circlesLeft} alt="" />
				<img className="circle-light" src={circlesRight} alt="" />
			</div>
			}
			<section className="hero">
				<div className="hero__text">
				<h1 className="hero__heading">Discover and showcase coding projects</h1>
				<p className="hero__subheading">Find inspirations and references for your next coding project with our collection of projects with source code</p>
				</div>
				<div className="hero__arrow">
					{isDark ?
						<img src={arrowDark} /> :
						<img src={arrow} />
					}
					<p className="hero__mono">Get Inspired</p>
				</div>
			</section>
			<section className="filter">
				<div className="filter__sort">
					<p className="filter__categories">Featured</p>
					<ChevronDownIcon className="icon-small filter__icon" />
				</div>
				<Categories 
					selected={selected}
					setSelected={setSelected}
				/>
			</section>
			<Projects
				projects={filteredProjects}
				user={user}
				liked={liked}
				setLiked={setLiked}
				setUpdate={setUpdate}
			/>
		</main>
	)
}

export default Home