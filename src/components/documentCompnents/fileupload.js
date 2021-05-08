import React, { useState } from 'react';
import Axios from 'axios';
import "../styles/fileUpload.css";
import TextField from '@material-ui/core/TextField';


function Fileupload() {

    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("choose a file");
    const [courseName, setCourseName] = useState("");

    const handleChange = (evt) => {
        setFile(evt.target.files[0]);
        setFileName(evt.target.files[0].name);
    }

    const handleChange2 = (evt) => {
        setCourseName(evt.target.value);
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await Axios({
                method: "POST",
                data: formData,
                withCredentials: true,
                url: `http://localhost:5000/documents/${courseName}`,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
        } catch (err) {
            if (err.response.status === 500) {
                console.log("There was problem tith the server");
            } else {
                console.log(err.response.data.msg)
            }
        }
    }

    return (
        <div className="file_upload_root">
            <form onSubmit={handleSubmit} style={{ display: "flex", marginBottom: "20px", flexDirection: "column" }}>
                <input style={{}} onChange={handleChange} type="file" name="file-1[]" id="file-1" class="inputfile inputfile-1" data-multiple-caption="{count} files selected" multiple />
                <label for="file-1"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg> <span>{fileName}&hellip;</span></label>
                <TextField
                    onChange={handleChange2}
                    required={true}
                    autoFocus
                    margin="dense"
                    id="course name"
                    label="course name"
                    fullWidth
                    name="courseName"
                    value={courseName}
                />
                <button style={{ cursor: "pointer" }} type="submit" className="btn-file-upload">Upload</button>
            </form>
        </div>
    );
}

export default Fileupload;