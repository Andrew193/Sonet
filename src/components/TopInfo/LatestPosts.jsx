import {useContext, useEffect, useState} from "react";
import s from "./top-info.module.css"
import Script from "./script.js"
import Skeleton from 'react-loading-skeleton';
import PostCreator from "./creators/post";
import Context from "../../helpers/contextHelper";
import {getSettings} from "../../db";
import {alpha} from "@mui/material";
import {useTranslation} from "react-i18next";

function LatestPosts() {
    const [state, setState] = useState(false);
    const [settings, setSettings] = useState({});
    const {socket} = useContext(Context);

    socket.on("postCreate", (updatedPosts) => {
        setState({posts: updatedPosts})
    })

    useEffect(() => {
        async function getData() {
            const response = await getSettings();

            setSettings(response[0])
        }

        getData();
    }, [])

    useEffect(() => {
        Script.getPosts()
            .then((newState) => {
                setState(newState)
            })
    }, [])

    const {t} = useTranslation();

    return (
        <div
            className={!state ? s.Tip + " " + s.Center : s.Tip}
            style={{
                background: alpha(settings?.configs?.color[settings?.color] || "rgb(203, 203, 243)", 0.2)
            }}
        >
            <h2>{t("Latest Posts")}</h2>
            {state ?
                <>
                    <PostCreator
                        toCreate={state?.posts}
                        settings={settings}
                    />
                    <div className={s.LastTipItem}>{t("Show More")}</div>
                </> : <Skeleton height={"50px"} count={5}/>}
        </div>
    )
}

export default LatestPosts;