import s from "./fast-music.module.css";
import {AiFillPlayCircle} from "react-icons/all";
import {Tooltip} from "@mui/material";
import {TooltipButtonCover} from "../components/tooltip-cover/TooltipButtonCover";

export type TrackType = { name: string };
type TrackPinType = {
    selected: boolean,
    track: TrackType,
    onTrackSelect: () => void
}

function TrackPin(props: TrackPinType) {
    const {
        track,
        onTrackSelect,
        selected
    } = props;

    return (
        <div
            className={s.FastTrack}
            style={{
                border: selected ? `1px solid red` : 'unset'
            }}
        >
            <span className="conversationName">{track?.name}</span>
            <Tooltip title={"Play this track"} arrow placement="top" className={"playTrackButton"}>
                <TooltipButtonCover>
                    <AiFillPlayCircle onClick={onTrackSelect}/>
                </TooltipButtonCover>
            </Tooltip>
        </div>

    )
}

export default TrackPin;