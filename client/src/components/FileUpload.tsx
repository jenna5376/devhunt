import React, { FormEvent, useState } from "react"
import Button from "./Button"
import axios from "axios";

const FileUpload = () => {
    const [file, setFile] = useState<File>();

    const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (evt.target.files && evt.target.files.length > 0) {
            setFile(evt.target.files[0]);
        }
    };

    const handleUpload = (evt: React.FormEvent) => {
        evt.preventDefault()
        console.log('uploading')
        if(file) {
            console.log(file)
            const formData = new FormData();
            formData.append("file", file);
            console.log(formData)
            axios.post("http://localhost:4000/upload", formData)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        }
    }


    return (
        <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>upload</button>
        </div>
    )
}

export default FileUpload
