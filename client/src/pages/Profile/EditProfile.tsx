import { FormEvent, useState } from "react"
import InputField from "../../components/InputField";
import { CameraIcon, EnvelopeIcon, CodeBracketIcon, LinkIcon } from "@heroicons/react/24/outline";
import Button from "../../components/Button";
import axios from "axios"

interface Props {
    user: any,
    setEdit: (value: boolean) => void;
    setUser: (value: any) => void;
}

const EditProfile = ({user, setEdit, setUser}: Props) => {

    type FormState = {
        id: String,
        name: string;
        about: string;
        publicEmail: string;
        github: string;
        website: string;
    };

    const [form, setForm] = useState<FormState>({
        id: user._id,
        name: user.name,
        about: user.about,
        publicEmail: user.publicEmail,
        github: user.github,
        website: user.website
    })

    const handleStateChange = (fieldName: string, value: string) => {
        setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
    };

 async function onSubmit(evt: FormEvent) {
    evt.preventDefault();
    const profileInfo = { ...form };
    
    await fetch("http://localhost:4000/profile/edit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(profileInfo),
        })
        .then((response) => response.json())
        .then((result) => setUser(result))
        .catch(error => {
            window.alert(error);
            return;
        });
        setForm({ 
            id: user._id, name: "", about: "", publicEmail: "", github: "", website: ""
        });
    setEdit(false);
}

    return (
    <form className="profile__left" onSubmit={(evt) => onSubmit(evt)}>
        <img className="profile__avatar" src={user.avatar} />
        <div className="profile__input">
            <InputField
                title="Name"
                state={form.name}
                placeholder= "Name"
                setState={(value) => handleStateChange("name", value)}
            />
        </div>
        <div className="profile__input">
            <InputField
                title="About"
                state={form.about}
                placeholder= "Add a bio"
                setState={(value) => handleStateChange("about", value)}
                textarea={true}
            />
        </div>
        <div className="profile__icon-input">
            <EnvelopeIcon className="icon" />
            <InputField
                state={form.publicEmail}
                placeholder= "Email"
                setState={(value) => handleStateChange("publicEmail", value)}
            />
        </div>
        <div className="profile__icon-input">
            <CodeBracketIcon className="icon" />
            <InputField
                state={form.github}
                placeholder= "GitHub URL"
                setState={(value) => handleStateChange("github", value)}
            />
        </div>
        <div className="profile__icon-input">
            <LinkIcon className="icon" />
            <InputField
                state={form.website}
                placeholder= "website"
                setState={(value) => handleStateChange("website", value)}
            />
        </div>
        <div className="profile__buttons">
            <button className="button" type="submit">Upload Project</button>
            <Button 
                text="Cancel"
                onclick={() => {setEdit(false)}}
            />
        </div>
    </form>
    )
}

export default EditProfile
