import {useState, useEffect} from "react";
import React from "react";
import {useSettings} from "../hooks";
import AllTracks from "../music/AllTracks";

function MusicContainer() {
    const [search, setSearch] = useState("");
    const [allFiles, setAllFiles] = useState<any>(null);

    const {settings} = useSettings(allFiles?.length);

    useEffect(() => {
        if (settings?.music && settings?.music[0]) {
            setAllFiles(() => {
                return search === ""
                    ? settings?.music?.map((track) => ({track, show: true}))
                    : settings?.music?.map((track, index) =>
                        settings?.musicDescriptions[index]?.category?.includes(search)
                            ? {track, show: true}
                            : {track, show: false}
                    )
            });
        }
    }, [settings?.music?.length, search]);

    return (
        <>
            <AllTracks
                allFiles={allFiles}
                settings={settings}
                ignoreActions
                setAllFiles={setAllFiles}
                setSearch={setSearch}
            />
        </>
    )
}

const areEqual = () => true;

const MusicContainerMemo = React.memo(() => {
    return <MusicContainer/>
}, areEqual);

export default MusicContainerMemo;