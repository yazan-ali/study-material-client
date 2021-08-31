import React, { useState } from 'react';
import axios from 'axios';

function Image_Uplode({ getImageUrl }) {

    const [fileInput, setFileInput] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleFileInputChange = (evt) => {
        const file = evt.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInput(evt.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (evt) => {
        evt.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
            setErrMsg('something went wrong!');
        };
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            const data = new FormData()
            data.append("file", base64EncodedImage);
            data.append("upload_preset", "study-material")
            data.append("cloud_name", "study-material")
            data.append("folder", "profile-pic")

            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/study-material/image/upload",
                data
            )

            getImageUrl(res.data.url)
            return res.data.url

            // setFileInput('');
            // setPreviewSource('');
            // setSuccessMsg('Image uploaded successfully');
        } catch (err) {
            console.error(err);
            setErrMsg('Something went wrong!');
        }
    };


    return (
        <div>
            <form className="form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInput}
                    className="form-input"
                />
                <button onClick={handleSubmitFile} className="btn" type="button">
                    Submit
                </button>
            </form>
            {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}
        </div>
    )
}

export default Image_Uplode;