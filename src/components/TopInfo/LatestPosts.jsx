import {useContext, useEffect, useState} from "react";
import s from "./top-info.module.css"
import Script from "./script.js"
import Skeleton from 'react-loading-skeleton';
import PostCreator from "./creators/post";
import {alpha} from "@mui/material";
import {useTranslation} from "react-i18next";
import {headerListLinks} from "../../vars";
import {useHistory} from "react-router-dom";
import {Context} from "../../App";
import {useSettings} from "../../hooks";
import {getElementsThemeConfig, getPropertiesConfig} from "../../utils";

function LatestPosts() {
    const [state, setState] = useState(false);
    const history = useHistory();
    const {settings } = useSettings()
    const {socket} = useContext(Context);

    socket.on("postCreate", (updatedPosts) => {
        setState({posts: updatedPosts})
    })

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
                ...getElementsThemeConfig(settings, getPropertiesConfig(false, '', false, '',
                    null, alpha(settings?.configs?.color[settings?.color] || "rgb(203, 203, 243)", 0.2)))
            }}
        >
            <h2>{t("Latest Posts")}</h2>
            {state ?
                <>
                    <PostCreator
                        toCreate={state?.posts}
                        settings={settings}
                    />
                    <div
                        className={s.LastTipItem}
                        onClick={() => {
                            history.push(headerListLinks.posts)
                        }}
                    >{t("Show More")}</div>
                </> : <Skeleton height={"50px"} count={5}/>}
        </div>
    )
}

export default LatestPosts;