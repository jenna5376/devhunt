import InputField from "../../components/InputField"
import React, { useState } from "react"
import RadioButton from "../../components/RadioButton"
import axios from "axios"

interface Props{
    user: any
  }

  //todo add image and category
const Upload = ({user}: Props) => {
    
    type FormState = {
        title: string;
        creator: any;
        // image: string;
        github: string;
        website: string;
        // category: string;
        displayReadme: string;
    };

    const [form, setForm] = useState<FormState>({
        title: "",
        creator: user._id,
        // image: "",
        github: "",
        website: "",
        // category: "",
        displayReadme: "yes"
    })

    const handleStateChange = (fieldName: string, value: string) => {
        setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
    };

    const handleSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();
        console.log(form)
        try {
            await axios.post(
                "http://localhost:4000/posts/upload",
                { ...form }
        );
        //todo redirect home
        alert("Recipe Created");
        } catch (error) {
            console.error(error);
        }
    }
    
    const isChecked = (value: string) => form.displayReadme === value;

  return (
    <div className="upload">
        <h1 className="upload__heading">Upload Project</h1>
        <p className="upload__subheading">Share your coding project with the Devhunt community</p>
        <form
            onSubmit={handleSubmit}
            className="upload__form"
        >
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
                state={form.website}
                placeholder="https://jsmastery.pro"
                setState={(value) => handleStateChange('website', value)}
                required={true}
            />

            <InputField
                type="url"
                title="Demo Site"
                state={form.github}
                placeholder="www.devhunt.com"
                setState={(value) => handleStateChange('github', value)}
            />
            <fieldset className="upload__fieldset">
                <legend className="upload__legend">Would you like to display your GitHub README?</legend>
                <RadioButton 
                    title="Yes"
                    value="yes"
                    handleChange={(value) => handleStateChange('displayReadme', value)}
                    checked={isChecked('yes')}
                />
                <RadioButton 
                    title="No"
                    value="no"
                    handleChange={(value) => handleStateChange('displayReadme', value)}
                    checked={isChecked('no')}
                />
            </fieldset>
            <button className="button" type="submit">Upload Project</button>
        </form>
    </div>
  )
}

export default Upload


