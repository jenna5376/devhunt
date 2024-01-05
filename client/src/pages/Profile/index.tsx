import { useEffect, useState } from "react";
import Info from "./ProfileInfo";
import EditProfile from "./EditProfile";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Projects from "../../components/Projects";
import { Post } from "../../models/models";
import { User } from "../../models/models"

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
	const navigate = useNavigate();

	const location = useParams().category;

	useEffect(() => {
		setCategory(location)
	}, [location]);

	
	//todo create fetch hook
	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await axios.get(
					`http://localhost:4000/posts/${user._id}`
				);
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
				setLiked(response.data)
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
			{!edit ? <Info
				user={user}
				setEdit={setEdit}	
			/> :
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
				<Projects 
					projects={selected === "work" ? projects : liked }
					user={user}
				/>
			</div>
		</div>
	)
}

export default Profile
