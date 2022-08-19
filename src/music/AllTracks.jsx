import s from "./music.module.css";
import {useMemo, useRef, useState} from "react";
import {Tooltip, Typography} from "@mui/material";
import {AiTwotoneDelete, AiTwotoneEdit} from "react-icons/all";
import {TooltipButtonCover} from "../components/tooltip-cover/TooltipButtonCover";
import {useTranslation} from "react-i18next";
import {updateSettings} from "../db";
import {notify} from "../App";
import {buttonsConfig} from "../createPost/CreatePostLine";
import {useOutsideClick} from "../hooks";
import TrackUpdateModal from "./TrackUpdateModal";
import SearchBar from "./SearchBar";

function deleteTrack(settings, index, callback) {
    settings?.music?.splice(index, 1);
    settings?.musicDescriptions?.splice(index, 1);
    updateSettings({
        ...settings,
        music: settings?.music,
        musicDescriptions: settings?.musicDescriptions
    }, 1)
        .then(() => {
            notify("Deleted");
            callback(settings?.music)
        })
}

function updateTrackDescription(settings, index, callback, newName, trackCategory) {
    settings.musicDescriptions[index] = {
        ...settings?.musicDescriptions[index],
        name: newName || settings?.musicDescriptions[index]?.name,
        category: trackCategory || settings?.musicDescriptions[index]?.category
    }

    updateSettings({
        ...settings,
        musicDescriptions: settings?.musicDescriptions
    }, 1)
        .then(() => {
            notify("Updated");
            callback(settings?.music)
        })
}

function AllTracks(props) {
    const {
        allFiles,
        settings,
        setAllFiles,
        setSearch
    } = props;

    const {t} = useTranslation();
    const [editConfig, setEditConfig] = useState({isOpened: false});
    const [newName, setNewName] = useState(null);
    const [trackCategory, setTrackCategory] = useState(null);

    const allTracks = useMemo(() => {
        return allFiles?.map((file, index) =>
            (file?.show === undefined || file?.show === true)
                ? <li className={s.Track}>
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
    }, [allFiles]);

    const wrapperRef = useRef(null);

    useOutsideClick(wrapperRef, () => {
        setEditConfig(() => ({
            isOpened: false
        }));
    })

    return (
        <div>
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
                className={`${s.TracksHeader} ${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
            >
                <p className={s.TrackIndex}>№</p>
                <p className={s.TrackName}>Name</p>
                <p className={s.TrackCategory}>Category</p>
                <p className={s.TrackActions}>Actions</p>
            </div>
            <ul>
                {allTracks}
            </ul>

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
        </div>
    )
}

export default AllTracks;