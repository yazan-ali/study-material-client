import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import axios from 'axios';

function Image_Uplode({ handelChangeProfilePic }) {

    const [fileInput, setFileInput] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [imageUrl, setImageUrl] = useState("");

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

    const handleSubmitFile = async (evt) => {
        evt.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
            updataProfileImage()
        };
        reader.onerror = () => {
            console.error('something went wrong!');
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
            setImageUrl(res.data.url)
            handelChangeProfilePic(res.data.url)
            return res.data.url
        } catch (err) {
            console.error(err);
        }
    };

    const [updataProfileImage] = useMutation(UpdataProfileImage, {
        variables: { image: imageUrl },
    });


    return (
        <div style={{ zIndex: 2 }}>
            <form className="form">
                <input
                    id="upload"
                    hidden
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInput}
                />
                <label className="image_upload" for="upload">Change</label>

                {
                    selectedFile ? (
                        <button onClick={handleSubmitFile} className="btn" type="button">
                            Submit
                        </button>
                    ) : ""
                }
            </form>
        </div>
    )
}

export default Image_Uplode;

const UpdataProfileImage = gql`
mutation updataProfileImage($image: String!){
    updataProfileImage(image: $image){
        id
    }
}
`