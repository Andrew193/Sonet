import s from "./music.module.css";
import {useContext, useEffect, useMemo, useRef, useState} from "react";
import {alpha, Tooltip, Typography} from "@mui/material";
import {AiTwotoneDelete, AiTwotoneEdit} from "react-icons/all";
import {TooltipButtonCover} from "../components/tooltip-cover/TooltipButtonCover";
import {MusicContext,} from "../App";
import {buttonsConfig} from "../create-post/CreatePostLine";
import {useOutsideClick} from "../hooks";
import TrackUpdateModal from "./TrackUpdateModal";
import SearchBar from "./SearchBar";
import Loader from "../components/common/spinner/Spinner";
import {deleteTrack, updateTrackDescription} from "./musicHelper";
import ReactPlayer from "react-player";

function AllTracks(props) {
    const {
        allFiles,
        settings,
        setAllFiles,
        setSearch
    } = props;

    const [musicContext, setMusicContext] = useContext(MusicContext);
    const [editConfig, setEditConfig] = useState({isOpened: false});
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [newName, setNewName] = useState(null);
    const [trackCategory, setTrackCategory] = useState(null);

    useEffect(() => {
        setMusicContext((context) => ({
            ...context,
            selectedTrack: selectedTrack
        }))
    }, [selectedTrack]);

    const allTracks = useMemo(() => {
        try {
            return allFiles?.map((file, index) =>
                (file?.show === undefined || file?.show === true)
                    ? <li
                        key={index}
                        className={s.Track}
                        onClick={() => {
                            setSelectedTrack(() => index)
                        }}
                        style={{
                            background: selectedTrack === index && "#f9d4d4"
                        }}
                    >
                        <span className={s.TrackIndex}>{index + 1}</span>
                        <span className={s.TrackName}>{settings?.musicDescriptions[index]?.name}</span>
                        <span className={s.TrackCategory}>{settings?.musicDescriptions[index]?.category}</span>
                        <span className={s.TrackActions}>
                     <Tooltip
                         title={"Delete this track"}
                         arrow
                         placement="top"
                     >
                                <TooltipButtonCover>
                                    <AiTwotoneDelete
                                        onClick={() => {
                                            deleteTrack(settings, index, (newFiles) => {
                                                setAllFiles(() => {
                                                    return [...newFiles]
                                                })
                                            })
                                        }}
                                    />
                                </TooltipButtonCover>
                     </Tooltip>
                     <Tooltip
                         title={"Edit this track"}
                         arrow
                         placement="top"
                     >
                                <TooltipButtonCover>
                                    <AiTwotoneEdit
                                        onClick={() => {
                                            setEditConfig(() => ({
                                                index,
                                                isOpened: true
                                            }))
                                        }}
                                    />
                                </TooltipButtonCover>
                     </Tooltip>
                </span>
                    </li>
                    : null
            )
        } catch (error) {
            return [];
        }
    }, [allFiles, selectedTrack]);

    const wrapperRef = useRef(null);

    useOutsideClick(wrapperRef, () => {
        setEditConfig(() => ({
            isOpened: false
        }));
    })

    return (
        <div>
            <style>{`
            .${s.Track}:hover {
            background-color: ${alpha(settings?.configs?.color[settings?.color] || "rgb(231 231 240)", 0.5)} !important;
            }
            .react-player__preview {
            margin-top: 20px;
            }
            `}</style>
            <Typography
                component={"h4"}
                variant={"h4"}
            >
                All tracks
            </Typography>
            <SearchBar
                setSearch={setSearch}
            />
            <div
                className={s.MusicContainer}
            >
                <div
                    className={`${s.TracksHeader} ${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
                >
                    <p className={s.TrackIndex}>№</p>
                    <p className={s.TrackName}>Name</p>
                    <p className={s.TrackCategory}>Category</p>
                    <p className={s.TrackActions}>Actions</p>
                </div>
                <ul>
                    {allTracks.length === 0 ? <Loader/> : allTracks}
                </ul>
            </div>

            <TrackUpdateModal
                editConfig={editConfig}
                wrapperRef={wrapperRef}
                setNewName={setNewName}
                updateTrackDescription={updateTrackDescription}
                settings={settings}
                setAllFiles={setAllFiles}
                setEditConfig={setEditConfig}
                newName={newName}
                trackCategory={trackCategory}
                setTrackCategory={setTrackCategory}
            />

            <>
                {
                    musicContext?.tracks?.length > 0 && musicContext?.selectedTrack !== null && <ReactPlayer
                        url={URL.createObjectURL(musicContext?.tracks[musicContext?.selectedTrack])}
                        className={s.Player}
                        onEnded={() => {
                            if (musicContext?.selectedTrack < musicContext?.tracksLength - 1) {
                                setMusicContext((context) => ({
                                    ...context,
                                    selectedTrack: musicContext?.selectedTrack + 1
                                }))
                                setSelectedTrack(musicContext?.selectedTrack + 1)
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
            </>
        </div>
    )
}

export default AllTracks;