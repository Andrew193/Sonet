import withPageHeader from "../hoc/withPageHeader";
import MusicTip from "./MusicTip";
import UploadNewTrack from "./UploadNewTrack";
import s from "../settings/settings.module.css";
import {Typography} from "@mui/material";
import MusicPlayer from "./MusicPlayer";
import PlayerActions from "./PlayerActions";
import AllTracks from "./AllTracks";

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
                    <div>
                        <MusicPlayer videoFilePath={videoFilePath}/>
                        <PlayerActions
                            dropPreviewMusic={dropPreviewMusic}
                            createNewSong={createNewSong}
                            color={settings?.configs?.color[settings?.color]}
                        />
                    </div>
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

export default withPageHeader(MusicInnerContainer, {path: "/music", Title: <span>Music</span>});