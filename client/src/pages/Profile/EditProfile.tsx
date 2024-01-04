import { useState } from 'react'
import InputField from '../../components/InputField';
import { CameraIcon, EnvelopeIcon, CodeBracketIcon, LinkIcon } from "@heroicons/react/24/outline";
import Button from '../../components/Button';

interface Props {
    user: any,
    setEdit: (value: boolean) => void;
}

const EditProfile = ({user, setEdit}: Props) => {

    type FormState = {
        name: string;
        about: string;
        email: string;
        github: string;
        website: string;
    };

    const [form, setForm] = useState<FormState>({
        name: "",
        about: "",
        email: "",
        github: "",
        website: ""
    })

    const handleStateChange = (fieldName: string, value: string) => {
        setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
    };

    function saveChanges(){
        setEdit(false)
        console.log(form)
    }

  return (
    <div className='profile__left'>
        <img className="profile__avatar" src={user.avatar} />
        <div className="profile__input">
            <InputField
                title='Name'
                state={form.name}
                placeholder= "Name"
                setState={(value) => handleStateChange('name', value)}
            />
        </div>
        <div className="profile__input">
            <InputField
                title='About'
                state={form.about}
                placeholder= "Add a bio"
                setState={(value) => handleStateChange('about', value)}
                textarea={true}
            />
        </div>
        <div className="profile__icon-input">
            <EnvelopeIcon className='icon' />
            <InputField
                state={form.email}
                placeholder= "Email"
                setState={(value) => handleStateChange('email', value)}
            />
        </div>
        <div className="profile__icon-input">
            <CodeBracketIcon className='icon' />
            <InputField
                state={form.github}
                placeholder= "GitHub URL"
                setState={(value) => handleStateChange('github', value)}
            />
        </div>
        <div className="profile__icon-input">
            <LinkIcon className='icon' />
            <InputField
                state={form.website}
                placeholder= "website"
                setState={(value) => handleStateChange('website', value)}
            />
        </div>
        <div className="profile__buttons">
            <Button
                text='Save Changes'
                onclick={saveChanges}
            />
        </div>
    </div>
  )
}

export default EditProfile
