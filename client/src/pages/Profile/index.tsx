import Button from "../../components/Button"
import { useState } from "react";
import Info from "./ProfileInfo";
import EditProfile from "./EditProfile";

interface Props{
  user: any
}

const Profile = ({user}: Props) => {
  const [selected, setSelected] = useState("Work");
  const [edit, setEdit] = useState(false);

  return (
    <div className="profile">
      {!edit ? <Info
        user={user}
        setEdit={setEdit}
      /> :
        <EditProfile 
          user={user}
          setEdit={setEdit}
        />
      }
      <div className="profile__projects">
        <ul className="categories">
            <button
                type="button"
                className={`chip chip--selected`}
                // onClick={() => setSelected(category)}
            >
                Work 5
            </button>
            <button
                type="button"
                className={`chip`}
                // onClick={() => setSelected(category)}
            >
                Liked Projects
            </button>
        </ul>
      </div>
    </div>
  )
}

export default Profile
