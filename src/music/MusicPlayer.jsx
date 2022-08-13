import ReactPlayer from "react-player";
import Fallback from "./img/fallback.png";
import s from "./music.module.css";

function MusicPlayer(props) {
    const {
        videoFilePath
    } = props;

    return (
        <div
            className={s.playerWrapper}
        >
            <ReactPlayer
                className={s.reactPlayer}
                url={videoFilePath}
                width="100%"
                style={{
                    marginBottom: "1%",
                    height: "unset",
                }}
                controls
                pip
                stopOnUnmount={false}
            />
        </div>
    )
}

export default MusicPlayer;