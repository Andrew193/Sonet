import {MusicContext} from "../App";
import {useMemo, useContext} from "react";
import TrackPin from "./TrackPin";
import {Typography} from "@mui/material";
import s from "./fast-music.module.css";
import ReactPlayer from "react-player";
import Fallback from "../music/img/fallback.png";
import React from "react";

function MusicContainer() {
    const [musicContext, setMusicContext] = useContext(MusicContext);

    const tracks = useMemo(() => musicContext?.tracks?.map((track, index) => <TrackPin
            onTrackSelect={() => {
                setMusicContext((context) => ({
                    ...context,
                    selectedTrack: index
                }))
            }}
            selected={musicContext?.selectedTrack === index}
            track={track}
            key={index}
        />
    ), [musicContext?.tracks, musicContext?.selectedTrack]);

    return (
        <>
            {
                musicContext?.selectedTrack !== null &&
                <>
                    <Typography
                        component={"h4"}
                        variant={"h4"}
                    >Playing now</Typography>
                    {
                        musicContext?.tracks?.length > 0 && musicContext?.selectedTrack !== null && <ReactPlayer
                            className={s.FastReactPlayer}
                            url={URL.createObjectURL(musicContext?.tracks[musicContext?.selectedTrack])}
                            width="100%"
                            style={{
                                marginBottom: "1%",
                                height: "unset",
                            }}
                            playIcon={<img style={{width: "100%"}} src={Fallback}/>}
                            onEnded={() => {
                                if (musicContext?.selectedTrack < musicContext?.tracksLength - 1) {
                                    setMusicContext((context) => ({
                                        ...context,
                                        selectedTrack: musicContext?.selectedTrack + 1
                                    }))
                                }
                            }
                            }
                            playing
                            controls
                            muted
                            light
                            pip
                            stopOnUnmount={false}
                        />
                    }
                    <br/>
                    <Typography
                        component={"h4"}
                        variant={"h4"}
                    >Other tracks</Typography>
                </>
            }
            {tracks}
        </>
    )
}

const areEqual = () => true;

const MusicContainerMemo = React.memo(() => {
    return <MusicContainer />
}, areEqual);

export default MusicContainerMemo;