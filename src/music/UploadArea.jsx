import {useRef} from "react";
import s from "./music.module.css";

function UploadArea(props) {
    const {
        handleVideoUpload
    } = props;

    let hiddenArea = useRef();

    return (
        <div
            className={s.UploadContainer}
        >
            <style>{`
            #custom-button {
            padding: 10px!important;
            color: white!important;
            background-color: #009578!important;
            border: 1px solid #000!important;
            border-radius: 5px;
            cursor: pointer;
            }

            #custom-button:hover {
            background-color: #00b28f;
            }

            #custom-text {
            margin-left: 10px;
            font-family: sans-serif;
            color: #aaa;
            }
            `}</style>
            <input
                type="file"
                id="real-file"
                ref={(element) => hiddenArea = element}
                style={{
                    display: "none"
                }}
                onChange={handleVideoUpload}
                onClick={(event)=> {
                    event.target.value = null
                }}
            />
            <button
                id="custom-button"
                onClick={() => {
                    hiddenArea.click();
                }}
            >CHOOSE A FILE
            </button>
            <span id="custom-text">No file chosen, yet.</span>
        </div>
    )
}

export default UploadArea;