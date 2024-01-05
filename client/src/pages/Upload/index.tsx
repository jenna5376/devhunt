import InputField from "../../components/InputField"
import React, { useState } from "react"
import RadioButton from "../../components/RadioButton"
import axios from "axios"
import FileUpload from "../../components/FileUpload"
import { useNavigate } from "react-router-dom"
import { User } from "../../models/models"

interface Props{
    user: User
  }

  //todo add image and category
const Upload = ({user}: Props) => {

    const navigate = useNavigate()

    type FormState = {
        file: string;
        title: string;
        creator: any;
        // image: string;
        github: string;
        website: string;
        // category: string;
        readme: number;
    };

    const [form, setForm] = useState<FormState>({
        file: "",
        title: "",
        creator: user._id,
        // image: "",
        github: "",
        website: "",
        // category: "",
        readme: 1
    })

    const handleStateChange = (fieldName: string, value: string | number) => {
        setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
        console.log(form)
    };

    const handleSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append('data', JSON.stringify(form))
            axios.post(
                "http://localhost:4000/upload", 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(res => console.log(res))
                .catch(err => console.log(err))
        }
        navigate('/')
    }

    const [file, setFile] = useState<File>();

    const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (evt.target.files && evt.target.files.length > 0) {
            setFile(evt.target.files[0]);
        }
    };

    return (
    <div className="upload">
        <h1 className="upload__heading">Upload Project</h1>
        <p className="upload__subheading">Share your coding project with the Devhunt community</p>
        <form
            onSubmit={handleSubmit}
            className="upload__form"
        >
            <div>
                <input className="input" type="file" onChange={handleFileChange} />
            </div>
            <InputField
                title="Project Title"
                state={form.title}
                placeholder="Project Title"
                setState={(value) => handleStateChange('title', value)}
                required={true}
            />

            <InputField
                type="url"
                title="GitHub Link"
                state={form.github}
                placeholder="https://jsmastery.pro"
                setState={(value) => handleStateChange('github', value)}
                required={true}
            />

            <InputField
                type="url"
                title="Demo Site"
                state={form.website}
                placeholder="www.devhunt.com"
                setState={(value) => handleStateChange('website', value)}
            />
            <fieldset className="upload__fieldset">
                <legend className="upload__legend">Would you like to display your GitHub README?</legend>
                <RadioButton 
                    title="Yes"
                    value={1}
                    handleChange={() => handleStateChange('readme', 1)}
                    checked={form.readme === 1}
                />
                <RadioButton 
                    title="No"
                    value={0}
                    handleChange={() => handleStateChange('readme', 0)}
                    checked={form.readme === 0}
                />
            </fieldset>
            <button className="btn btn--large" type="submit">Upload Project</button>
        </form>
    </div>
  )
}

export default Upload


