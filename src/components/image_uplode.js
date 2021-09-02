import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import axios from 'axios';
import ImageIcon from '@material-ui/icons/Image';

function Image_Uplode({ handelUploadImage, profileImage }) {

    const [fileInput, setFileInput] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [imageUrl, setImageUrl] = useState("");

    const handleFileInputChange = (evt) => {
        const file = evt.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInput(evt.target.value);

        if (file.length > 0) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            uploadImage(reader.result)
        };
        reader.onerror = () => {
            console.error('something went wrong!');
        };
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
        updataProfileImage()
        setSelectedFile(null);
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            const data = new FormData()
            data.append("file", base64EncodedImage);
            data.append("upload_preset", "study-material")
            data.append("cloud_name", "study-material")
            data.append("folder", profileImage ? "profile-pic" : "posts-images")
            handelUploadImage("", true)
            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/study-material/image/upload",
                data
            )
            setImageUrl(res.data.url)
            handelUploadImage(res.data.url, false)
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
                    style={{ display: 'none' }}
                    id="upload"
                    hidden
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInput}
                />
                {
                    profileImage ? (
                        <label className="profile-image_upload" for="upload">Change</label>
                    ) : (
                        <label className="post-image_upload" for="upload"><ImageIcon /></label>)
                }
                {
                    profileImage && selectedFile ? (
                        <button onClick={handleSubmitFile} className="save-btn" type="button">
                            Save
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