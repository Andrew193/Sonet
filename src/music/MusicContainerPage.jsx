import s from "../settings/settings.module.css";
import {Box} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {updateSettings} from "../db";
import {notify} from "../App";
import MusicInnerContainer from "./MusicInnerContainer";
import {useSettings} from "../hooks";
import {getEmptyElementsThemeConfig} from "../utils";

function MusicContainerPage() {
    const [videoFilePath, setVideoFilePath] = useState(null);
    const [file, setFile] = useState();
    const [search, setSearch] = useState("");
    const [allFiles, setAllFiles] = useState(null);
    const settingsConfig = useSettings(allFiles?.length);

    useEffect(() => {
        if (settingsConfig?.settings?.music && settingsConfig?.settings?.music[0]) {
            setAllFiles(() => {
                return search === ""
                    ? settingsConfig?.settings?.music?.map((track) => ({track, show: true}))
                    : settingsConfig?.settings?.music?.map((track, index) =>
                        settingsConfig?.settings?.musicDescriptions[index]?.category?.includes(search)
                            ? {track, show: true}
                            : {track, show: false}
                    )
            });
        }
    }, [settingsConfig?.settings, search]);

    const createNewSong = useCallback(() => {
        function readFile() {
            updateSettings({
                ...settingsConfig.settings,
                music: [...settingsConfig.settings?.music, file],
                musicDescriptions: [...settingsConfig.settings?.musicDescriptions, {
                    name: file?.name,
                    category: null,
                    marks: []
                }]
            }, 1)
                .finally(() => {
                    setFile(() => null);
                    setVideoFilePath(() => null);
                    setAllFiles((state) => [...(state || []), file]);
                    notify("Added")
                })
        }

        const reader = new FileReader();
        reader.addEventListener('load', readFile);
        reader.readAsText(file);
    }, [file]);

    function dropPreviewMusic() {
        setFile(null);
        setVideoFilePath(null)
        notify("Deleted from preview")
    }

    return (
        <Box
            className={s.Container}
            style={{
                ...getEmptyElementsThemeConfig(settingsConfig.settings),
                marginBottom: "54px"
            }}
        >
            <MusicInnerContainer
                setSearch={setSearch}
                setFile={setFile}
                setVideoFilePath={setVideoFilePath}
                videoFilePath={videoFilePath}
                dropPreviewMusic={dropPreviewMusic}
                settings={settingsConfig?.settings}
                createNewSong={createNewSong}
                allFiles={allFiles}
                setAllFiles={setAllFiles}
            />
        </Box>
    )
}

export default MusicContainerPage;