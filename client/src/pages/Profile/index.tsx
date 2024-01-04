import { useEffect, useState } from "react";
import Info from "./ProfileInfo";
import EditProfile from "./EditProfile";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Projects from "../../components/Projects";

interface Props{
	user: any
	setUser: (value: any) => void;
}

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

//todo user interface
const Profile = ({user, setUser}: Props) => {
	const [selected, setSelected] = useState(useParams().category || "work");
	const [edit, setEdit] = useState(false);
	const [projects, setProjects] = useState<Array<Post>>([]);
	const [liked, setLiked] = useState<Array<Post>>(user.likedPosts);
	const navigate = useNavigate();
	
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
		console.log(liked)
	}, []);

	function setCategory(category?: string): void {
		if (category){
			navigate(`/profile/${category}`)
			setSelected(category)
		}
		else {
			navigate('/profile')
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
						onClick={() => setCategory()}
					>
						Work<span className="profile__count">{projects.length}</span>
					</button>
					<button
						type="button"
						className={`chip ${selected==='liked' ? 'chip--selected' : ''}`}
						onClick={() => setCategory('liked')}
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
