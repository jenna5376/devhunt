import { useEffect, useState } from "react";
import Info from "./ProfileInfo";
import EditProfile from "./EditProfile";
import { useParams, useNavigate } from "react-router-dom";

interface Props{
	user: any
	setUser: (value: any) => void;
}

const Profile = ({user, setUser}: Props) => {
	const [selected, setSelected] = useState(useParams().category || "work");
	const [edit, setEdit] = useState(false);
	const navigate = useNavigate();

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
					Work 5
				</button>
				<button
					type="button"
					className={`chip ${selected==='liked' ? 'chip--selected' : ''}`}
					onClick={() => setCategory('liked')}
				>
					Liked Projects
				</button>
			</ul>
		</div>
		</div>
	)
}

export default Profile
