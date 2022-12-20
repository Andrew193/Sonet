import ReactPlayer from "react-player";
import React from "react";
import s from "./music.module.css";
import PropTypes from "prop-types";

function MusicPlayer(props) {
    const {
        videoFilePath
    } = props;

    return (
        <div className={s.playerWrapper}>
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

MusicPlayer.propTypes = {
    videoFilePath: PropTypes.string
}

export default MusicPlayer;