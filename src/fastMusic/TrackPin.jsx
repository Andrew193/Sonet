import s from "./fast-music.module.css";
import {AiFillPlayCircle} from "react-icons/all";

function TrackPin(props) {
    const {
        track,
        onTrackSelect
    } = props;

    return (
        <div
            className={s.FastTrack}
        >
            <span className="conversationName">{track?.name}</span>
            <AiFillPlayCircle
                onClick={onTrackSelect}
            />
        </div>

    )
}

export default TrackPin;