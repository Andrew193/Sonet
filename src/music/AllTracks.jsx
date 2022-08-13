import s from "./music.module.css";
import {useMemo} from "react";
import {Tooltip, Typography} from "@mui/material";
import {AiTwotoneDelete, AiTwotoneEdit} from "react-icons/all";
import {TooltipButtonCover} from "../fastMessage/FastMessageContainer";
import {useTranslation} from "react-i18next";
import {updateSettings} from "../db";
import {notify} from "../App";

function deleteTrack(settings, index, callback) {
    settings?.music?.splice(index, 1);
    updateSettings({
        ...settings,
        music: settings?.music
    }, 1)
        .then(() => {
            notify("Deleted");
            callback(settings?.music)
        })
}

function AllTracks(props) {
    const {
        allFiles,
        settings,
        setAllFiles
    } = props;

    const {t} = useTranslation();

    const allTracks = useMemo(() => {
        return allFiles?.map((file, index) => <li key={index} className={s.Track}>
                <span className={s.TrackIndex}>{index + 1}</span>
                <span className={s.TrackName}>{file?.name}</span>
                <span className={s.TrackActions}>
                     <Tooltip
                         title={t("Delete this track")}
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
                         title={t("Edit this track")}
                         arrow
                         placement="top"
                     >
                                <TooltipButtonCover>
                                    <AiTwotoneEdit/>
                                </TooltipButtonCover>
                     </Tooltip>
                </span>
            </li>
        )
    }, [allFiles]);

    return (
        <div>
            <Typography
                component={"h4"}
                variant={"h4"}
            >
                All tracks
            </Typography>
            <ul>
                {allTracks}
            </ul>
        </div>
    )
}

export default AllTracks;