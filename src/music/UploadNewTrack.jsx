import UploadArea from "./UploadArea";

function UploadNewTrack(props) {
    const {
        setVideoFilePath,
        setFile
    } = props;

    const handleVideoUpload = (event) => {
        setVideoFilePath(() => URL.createObjectURL(event.target.files[0]));
        setFile(() => event.target.files[0]);
    };

    return (
        <>
            <UploadArea
                handleVideoUpload={handleVideoUpload}
            />
        </>
    )
}

export default UploadNewTrack;