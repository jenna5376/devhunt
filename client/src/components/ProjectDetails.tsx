import { CalendarIcon, HeartIcon, EyeIcon, XMarkIcon, CodeBracketIcon, LinkIcon } from "@heroicons/react/24/outline"
import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { Post } from "../models/models"
import Button from "./Button"


interface Props {
	id: string
}

const ProjectDetails = () => {

	//change this so i don't fetch project det twice
	
	const modalRef = useRef(null)
	const { id } = useParams();
	const navigate = useNavigate()
	const [project, setProject] = useState<Post>({} as Post)
	const [owner, setOwner] = useState("")
	const [repo, setRepo] = useState("")
	
	useEffect(()=>{
		const fetchProject = async () => {
			try {
				const response = await axios.get("http://localhost:4000/posts/" + id);
				setProject(response.data);
				const github = (response.data.github)
				const cleanUrl = github.replace(/^(https?:\/\/)?/, '');
				const parts = cleanUrl.split('/');
				setOwner(parts[1])
				setRepo(parts[2])
			} catch (err) {
			console.log(err);
		}}
		fetchProject();
		fetchData()
	}, [])



	useEffect(() => {
	const observerRefValue = modalRef.current;
	document.body.style.overflow = 'hidden';

	return () => {
		if (observerRefValue) {
		document.body.style.overflow = 'visible';
		}
	};
	}, []);

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

	return (
		<div className="modal-bg" ref={modalRef} onClick={() => navigate('/')}>
		<div className="project-det" onClick={(e) => e.stopPropagation()}>
			<main>
				<header className="project-det__header">
					<div className="project-det__left">
						<h1 className="project-det__title">{project?.title}</h1>
						<div className="project-det__info">
							<div className="project-det__metadata">
								<CalendarIcon className="icon-x-small" />
								<span className="project-det__stat">Yesterday</span>
							</div>
							<div className="project-det__dot"></div>
							<div className="project-det__metadata">
								<HeartIcon className="icon-x-small" />
								<span className="project-det__stat">{project.likeCount}</span>
							</div>
							<div className="project-det__dot"></div>
							<div className="project-det__metadata">
								<EyeIcon className="icon-x-small" />
								<span className="project-det__stat">{project.viewCount}</span>
							</div>
						</div>
					</div>
					<div className="project-det__btns">
						<div className="icon-btn">
							<HeartIcon className="icon-small" />
						</div>
						<Button
							text="View Code"
							color="secondary"
						/>
						<Button
							text="Visit Site"
						/>
						<div className="icon-btn icon-btn--transparent">
							<XMarkIcon className="icon-small" />
						</div>
					</div>
				</header>
				<article>
				<div className="project-det__img-wrapper">
					<img className="project-det__img" src={`http://localhost:4000/images/${project.image}`}/>
				</div>
				<p>We recently launched the MVP site for Creative South, featuring some amazing illustrations from our team. We had a ton of fun creating a new world for the upcoming conference. Fun fact, this site was just featured on the big screen during the keynote at this year's Webflow Conference. We can't wait to share what else we have in the works. You can get your early bird tickets now! Join us March 30 - April 1, 2023 in Columbus, GA.</p>
				</article>
			</main>
			<aside>
				<p>Links</p>
				{project.github && 
				<div className="profile__link">
					<CodeBracketIcon className="icon-x-small" />
					<a href={project.github} target="_blank"className="profile__url">{project.github}</a>
				</div>
				}
				{project.website && 
				<div className="profile__link">
					<LinkIcon className="icon-x-small" />
					<a href={project.website} target="_blank"className="profile__url">{project.website}</a>
				</div>
				}

				<p>Languages</p>
				
				<p>Contributors</p>
			</aside>
			</div>
		</div>
	)
}

export default ProjectDetails
