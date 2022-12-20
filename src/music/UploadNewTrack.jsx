import React from "react";
import UploadArea from "./UploadArea";
import PropTypes from "prop-types";

function UploadNewTrack(props) {
    const {
        setVideoFilePath,
        setFile
    } = props;

    const handleVideoUpload = (event) => {
        setVideoFilePath(() => URL.createObjectURL(event.target.files[0]));
        setFile(() => event.target.files[0]);
    };

    return (<UploadArea handleVideoUpload={handleVideoUpload}/>)
}

UploadNewTrack.propTypes = {
    setVideoFilePath: PropTypes.func,
    setFile: PropTypes.func
}

export default UploadNewTrack;