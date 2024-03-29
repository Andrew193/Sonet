import React from "react";
import withPageHeader from "../hoc/withPageHeader";
import MusicTip from "./MusicTip";
import UploadNewTrack from "./UploadNewTrack";
import s from "../settings/settings.module.css";
import {Typography} from "@mui/material";
import MusicPlayer from "./MusicPlayer";
import PlayerActions from "./PlayerActions";
import AllTracks from "./AllTracks";
import PropTypes from "prop-types";

function MusicInnerContainer(props) {
    const {
        setSearch,
        setFile,
        setVideoFilePath,
        videoFilePath,
        dropPreviewMusic,
        settings,
        createNewSong,
        allFiles,
        setAllFiles
    } = props;

    return (
        <>
            <MusicTip/>
            <UploadNewTrack
                setFile={setFile}
                setAllFiles={setAllFiles}
                setVideoFilePath={setVideoFilePath}
            />
            {
                !!videoFilePath
                && <div className={s.MusicCover}>
                    <Typography
                        variant={"h5"}
                        component={"h5"}
                        style={{
                            fontWeight: "bold"
                        }}
                    >
                        Selected track
                    </Typography>
                    <PlayerActions
                        dropPreviewMusic={dropPreviewMusic}
                        createNewSong={createNewSong}
                        color={settings?.configs?.color[settings?.color]}
                    />
                    <MusicPlayer videoFilePath={videoFilePath}/>
                </div>
            }
            <AllTracks
                setSearch={setSearch}
                allFiles={allFiles}
                settings={settings}
                setAllFiles={setAllFiles}
            />
        </>
    )
}

MusicInnerContainer.propTypes = {
    setSearch: PropTypes.func,
    setFile: PropTypes.func,
    setVideoFilePath: PropTypes.func,
    videoFilePath: PropTypes.string,
    dropPreviewMusic: PropTypes.func,
    settings: PropTypes.object,
    createNewSong: PropTypes.func,
    allFiles: PropTypes.array,
    setAllFiles: PropTypes.func
}

export default withPageHeader(MusicInnerContainer, {path: "/music", Title: <span>Music</span>});