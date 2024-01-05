import { User } from "../../models/models"

interface Props{
    user: User
}

const Settings = ({user}: Props) => {
    return (
        <div>
        <h1>Account Settings</h1>
        <p>Manage your Devhunt account</p>
        <form>
            
        </form>
        </div>
    )
}

export default Settings
