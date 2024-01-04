import InputField from "../../components/InputField"
import React, { useState } from "react"
import RadioButton from "../../components/RadioButton"
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid"

const Upload = () => {
    type FormState = {
        title: string;
        // description: string;
        image: string;
        liveSiteUrl: string;
        githubUrl: string;
        category: string;
        displayReadme: string;
    };

    const [form, setForm] = useState<FormState>({
        title: "",
        image: "",
        liveSiteUrl: "",
        githubUrl: "",
        category: "",
        displayReadme: "yes"
    })

    const handleStateChange = (fieldName: string, value: string) => {
        setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
    };

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        console.log(form)
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
                state={form.liveSiteUrl}
                placeholder="https://jsmastery.pro"
                setState={(value) => handleStateChange('liveSiteUrl', value)}
                required={true}
            />

            <InputField
                type="url"
                title="Demo Site"
                state={form.githubUrl}
                placeholder="www.devhunt.com"
                setState={(value) => handleStateChange('githubUrl', value)}
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


