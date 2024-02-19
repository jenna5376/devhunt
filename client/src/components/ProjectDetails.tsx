import { CalendarIcon, HeartIcon, EyeIcon, XMarkIcon, CodeBracketIcon, LinkIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline"
import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { Post } from "../models/models"
import Button from "./Button"
import Markdown from 'markdown-to-jsx'
import emoji from 'emoji-dictionary'

interface Props {
	setUpdate: (val: Date) => void;
};

const ProjectDetails = ({setUpdate}: Props) => {

	//change this so i don't fetch project det twice
	
	const modalRef = useRef(null)
	const { id } = useParams();
	const navigate = useNavigate()
	const [project, setProject] = useState<Post>({} as Post)
	const [owner, setOwner] = useState("")
	const [repo, setRepo] = useState("")
	const [open, setOpen] = useState(false)

	interface GhProfile {
		avatar_url: string,
		login: string,
		repos_url: string
	}

	interface GhData {
		readme: string;
		languages: string[];
		tags: string[];
		contributors: Array<GhProfile>;
	}

	const [ghData, setGhData] = useState<GhData>({
		readme: '',
		languages: [],
		contributors: [],
		tags: []
	})
	
	useEffect(()=>{
		const fetchProject = async () => {
			try {
				const response = await axios.get("http://localhost:4000/posts/" + id);
				setProject(response.data);
				setUpdate(new Date());
				const github = (response.data.github)
				const cleanUrl = github.replace(/^(https?:\/\/)?/, '');
				const parts = cleanUrl.split('/');
				setOwner(parts[1])
				setRepo(parts[2])
			} catch (err) {
			console.log(err);
		}}
		fetchProject();
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

	useEffect(()=>{
		if (repo && owner){
			fetchData()
		}
	}, [repo, owner])

	const fetchData = () => {
		fetch(`https://api.github.com/repos/${owner}/${repo}/readme`)
			.then((response) => response.json())
			.then((data) => {
				let md = decodeURIComponent(atob(data.content))
				md = md.replace(/:\w+:/gi, name => emoji.getUnicode(name))
				setGhData(prev => ({...prev, readme: md}))
			});

		fetch(`https://api.github.com/repos/${owner}/${repo}/languages`)
			.then((response) => response.json())
			.then((data) => {
				setGhData(prev => ({...prev, languages: Object.keys(data)}))
			});

		fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`)
			.then((response) => response.json())
			.then((data) => {
				setGhData(prev => ({...prev, contributors: data}))
			});
			
		fetch(`https://api.github.com/repos/${owner}/${repo}/topics`)
			.then((response) => response.json())
			.then((data) => {
				setGhData(prev => ({...prev, tags: data.names}))
			});
	}

	return (
		<div className="modal-bg" ref={modalRef} onClick={() => navigate('/')}>
			<div className="project-det" onClick={(e) => e.stopPropagation()}>
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
						<div className="icon-btn" onClick={()=>setOpen(!open)}>
							<EllipsisHorizontalIcon className="icon-small" />
						</div>
						{
							open && (
								<div>
									<p>Edit post</p>
									<p>Delete post</p>
								</div>
							)
						}
						<div className="icon-btn">
							<HeartIcon className="icon-small" />
						</div>
						{project.website && <Button
							text="View Code"
							color="secondary"
							onclick={()=>{ window.open(project.website);
							}}
						/>}
						<Button
							text="Visit Site"
							onclick={()=>{ window.open(project.github);
							}}
						/>
						<div className="icon-btn icon-btn--transparent">
							<XMarkIcon className="icon-small" 
								onClick={() => navigate('/')}
							/>
						</div>
					</div>
				</header>
				<main className="project-det__content">
					<article className="project-det__article">
						<div className="project-det__img-wrapper">
							<img className="project-det__img" src={`http://localhost:4000/images/${project.image}`}/>
						</div>
						<Markdown children={ghData.readme} />
					</article>
					<aside className="project-det__side">
						<div>
							<p className="project-det__heading">Links</p>
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
						</div>
							{ghData.languages.length > 0 && <div>
								<p className="project-det__heading">Languages</p>
								<ul className="tags">
									{ghData.languages.map((value) => (
										<li className="tag" key={value}>{value}</li>
									))}
								</ul>
							</div>}
							{ghData.tags.length > 0 && 
							<div>
								<p className="project-det__heading">Tags</p>
								<ul className="tags">
									{ghData.tags.map((value) => (
										<li className="tag" key={value}>{value}</li>
									))}
								</ul>
							</div>}
							{ghData.contributors.length > 0 && <div>
								<p className="project-det__heading">Contributors</p>
								{ghData.contributors.map((value) => (
									<div className="project-det__contributor">
										<img className="project-det__avatar" src={value.avatar_url} />
										<p>{value.login}</p>
									</div>
								))}
							</div>}
					</aside>
				</main>
			</div>
		</div>
	)
}

export default ProjectDetails
