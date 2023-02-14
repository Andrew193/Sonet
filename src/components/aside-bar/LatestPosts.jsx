import React from "react";
import {useContext, useEffect, useState} from "react";
import AsideBarStyles from "./aside-bar.module.css"
import AsideBarHelper from "./AsideBarHelper"
import Skeleton from 'react-loading-skeleton';
import PostCreator from "./creators/PostCreator";
import {alpha} from "@mui/material";
import {useTranslation} from "react-i18next";
import {headerListLinks} from "../../vars";
import {useHistory} from "react-router-dom";
import {Context} from "../../App";
import {useSettings} from "../../hooks";
import {getElementsThemeConfig, getPropertiesConfig} from "../../utils";

function LatestPosts() {
    const [postsConfig, setPostsConfig] = useState();
    const history = useHistory();
    const {settings} = useSettings()
    const {socket} = useContext(Context);

    socket.on("postCreate", (updatedPosts) => setPostsConfig({posts: updatedPosts}))

    useEffect(() => {
        AsideBarHelper.getPosts()
            .then((newState) => setPostsConfig(newState))
    }, [])

    const {t} = useTranslation();

    return (
        <div
            className={!postsConfig ? `${AsideBarStyles.Tip} ${AsideBarStyles.Center}` : AsideBarStyles.Tip}
            style={{
                ...getElementsThemeConfig(settings, getPropertiesConfig(false, '', false, '',
                    null, alpha(settings?.configs?.color[settings?.color] || "rgb(203, 203, 243)", 0.2)))
            }}
        >
            <h2>{t("Latest Posts")}</h2>
            {postsConfig ?
                <>
                    <PostCreator
                        toCreate={postsConfig?.posts}
                        settings={settings}
                    />
                    <div
                        className={AsideBarStyles.LastTipItem}
                        onClick={() => history.push(headerListLinks.posts)}
                    >{t("Show More")}</div>
                </> : <Skeleton height={"50px"} count={5}/>}
        </div>
    )
}

export default LatestPosts;