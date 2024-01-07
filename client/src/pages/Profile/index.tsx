import { useEffect, useState } from "react";
import Info from "./ProfileInfo";
import EditProfile from "./EditProfile";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Projects from "../../components/Projects";
import { Post } from "../../models/models";
import { User } from "../../models/models"
import Button from "../../components/Button";
import { CodeBracketIcon } from "@heroicons/react/24/outline";

interface Props{
	user: User
	setUser: (value: any) => void;
}

//todo user interface
const Profile = ({user, setUser}: Props) => {
	const [selected, setSelected] = useState(useParams().category || "work");
	const [edit, setEdit] = useState(false);
	const [projects, setProjects] = useState<Array<Post>>([]);
	const [liked, setLiked] = useState<Array<Post>>([]);
	const [likedId, setLikedId] = useState<Array<String>>([]);
	const navigate = useNavigate();

	const location = useParams().category;

	useEffect(() => {
		setCategory(location)
	}, [location]);
	
	useEffect(() => {
		const fetchProjects = async () => {
			console.log(user._id)
			try {
				const response = await axios.get(
					`http://localhost:4000/posts/by/${user._id}`
				);
				if (response.data === null) return
				setProjects(response.data)
			} catch (err) {
				console.log(err);
			}
		};
		fetchProjects();
		const likedProjects = async () => {
			try {
				const response = await axios.get(
					`http://localhost:4000/posts/liked/${user._id}`
				);
				if (response.data === null) return
				setLiked(response.data)
				setLikedId(response.data.map((liked: Post) => liked._id))

			} catch (err) {
				console.log(err);
			}
		};
		likedProjects();
	}, []);

	function setCategory(category?: string): void {
		if (category){
			setSelected(category)
		}
		else {
			setSelected('work')
		}
	}
	
	return (
		<div className="profile">
			{!edit ? 
				<Info
					user={user}
					setEdit={setEdit}	
				/> 
				:
				<EditProfile 
					user={user}
					setUser={setUser}
					setEdit={setEdit}
				/>
			}
			<div className="profile__projects">
				<ul className="categories">
					<button
						type="button"
						className={`chip ${selected==='work' ? 'chip--selected' : ''}`}
						onClick={() => navigate('/profile')}
					>
						Work<span className="profile__count">{projects.length}</span>
					</button>
					<button
						type="button"
						className={`chip ${selected==='liked' ? 'chip--selected' : ''}`}
						onClick={() => navigate('/profile/liked')}
					>
						Liked Projects<span className="profile__count">{liked.length}</span>
					</button>
				</ul>
				{
					((selected==="work" && projects.length === 0) 
					|| (selected==="liked" && liked.length === 0))
					&& (
						<div className="empty">
							<div className="empty__icon-container">
								<CodeBracketIcon className="icon-small empty__icon"/>
							</div>
							<p className="empty__heading">No projects yet</p>
							<p className="empty__text">When you upload a project, it'll show up here</p>
							<Button
								text="Upload Project"
								onclick={() => navigate("/upload")}
							/>
						</div>
					)
				}
				<Projects 
					projects={selected === "work" ? projects : liked }
					user={user}
					liked={likedId}
					setLiked={setLikedId}
				/>
			</div>
		</div>
	)
}

export default Profile
