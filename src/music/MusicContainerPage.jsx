import s from "../settings/settings.module.css";
import {Box} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {getSettings, updateSettings} from "../db";
import {notify} from "../App";
import MusicInnerContainer from "./MusicInnerContainer";

function MusicContainerPage() {
    const [settings, setSettings] = useState({});
    const [videoFilePath, setVideoFilePath] = useState(null);
    const [file, setFile] = useState();
    const [allFiles, setAllFiles] = useState([]);

    useEffect(() => {
        async function getData() {
            const response = await getSettings();

            setSettings(response[0])
        }

        getData();
    }, []);

    useEffect(() => {
        if (settings?.music && settings?.music[0]) {
            setAllFiles(() => settings?.music);
            setVideoFilePath(URL.createObjectURL(settings?.music[0]));
        }
    }, [settings])

    const createNewSong = useCallback(() => {
        function readFile() {
            updateSettings({
                ...settings,
                music: [...settings?.music, file]
            }, 1)
                .finally(() => {
                    setFile(null);
                    setVideoFilePath(null);
                    setAllFiles((state) => [...state, file]);
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
                background: settings?.configs?.background[settings?.background],
            }}
        >
            <MusicInnerContainer
                setFile={setFile}
                setVideoFilePath={setVideoFilePath}
                videoFilePath={videoFilePath}
                dropPreviewMusic={dropPreviewMusic}
                settings={settings}
                createNewSong={createNewSong}
                allFiles={allFiles}
                setAllFiles={setAllFiles}
            />
        </Box>
    )
}

export default MusicContainerPage;