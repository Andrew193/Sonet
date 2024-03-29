import {useContext, useEffect, useState} from "react";
import React from "react";
import ClearPosts from "./PostsInnerContent";
import postsHelper, {getFilteredPostsByTags} from "./postsHelper"
import Skeleton from 'react-loading-skeleton';
import s from "./posts.module.css"
import {useHistory, withRouter} from "react-router-dom";
import {alpha, hexToRgb} from "@mui/material";
import FiltersBar from "./FiltersBar";
import {Context} from "../App";
import {useSettings} from "../hooks";
import MaintainedPageHeader from "../components/MaintainedPageHeader";
import {getEmptyElementsThemeConfig} from "../utils";
import {USER_INFORMATION} from "../vars";
import {getItemFromLocalStorage} from "../localStorageService";
import PropTypes from "prop-types";
import Separator from "../components/common/Separator/Separator";
import {withAsideBar} from "../hoc/withAsideBar";

function PostsContainer(props) {
    const [posts, setPosts] = useState(false);
    const [isSetup, setIsSetup] = useState(false);
    const history = useHistory();
    const {settings} = useSettings();

    const {socket, notify} = useContext(Context);
    const id = getItemFromLocalStorage(USER_INFORMATION, "id");

    socket.on("postUpdate", (updatedPosts) => setPosts({posts: updatedPosts}));

    useEffect(() => {
        const getData = (id) => id && typeof (+id) === "number" ? postsHelper.getSelectedPost(+id) : postsHelper.getPosts()

        getData(+props?.match?.params?.id).then((postF) => setPosts(postF))
            .catch((error) => {
                error && notify(error?.response?.data?.posts)
            })
    }, [notify, props?.match?.params?.id]);

    useEffect(() => {
        if (history?.location?.hash) {
            setPosts(getFilteredPostsByTags(posts, history))
        } else {
            setPosts((posts) => ({
                posts: posts?.posts?.map((post) => ({...post, show: undefined}))
            }))
        }
    }, [history?.location?.hash]);

    useEffect(() => {
        if (posts?.posts && !isSetup && !!history?.location?.hash) {
            setIsSetup(() => true);
            setPosts(getFilteredPostsByTags(posts, history))
        }
    }, [posts, history?.location?.hash]);

    return (
        <div className={s.Container} style={{...getEmptyElementsThemeConfig(settings)}}>
            <style>{`
            .inputCover {
            position: absolute!important;
            z-index: 11;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: unset;
            flex-direction: column;
            justify-content: center;
            background-color: ${alpha(hexToRgb(settings?.configs?.color[settings?.color] || "#f6f2ff"), 0.4)}!important;
            }
            .${s.Item} .fromNow:before {
            top: 11px !important;
            }
            .${s.Container} .react-emoji-picker {
            top:0px!important;
            width:100%!important;
            }
            }
            .itemsPostsPage {
            background: ${settings?.configs?.background[settings?.background]};
            border-bottom: 1px solid ${settings?.configs?.color[settings?.color]}!important;
            cursor: pointer;
            display: flex;
            }
            .itemsPostsPage:nth-child(2n) {
            background-color: ${alpha(settings?.configs?.color[settings?.color] || "#f6f2ff", 0.3)} !important;
            }
            .itemsPostsPage:hover {
            background-color: ${alpha(settings?.configs?.color[settings?.color] || "#f6f2ff", 0.5)} !important;
            }
            .basicPageHead {
            background: ${settings?.configs?.background[settings?.background]};
            }
            .rowPostsContainer {
            height:inherit;
            border-left: 1px solid ${settings?.configs?.color[settings?.color]};
            border-right: 1px solid ${settings?.configs?.color[settings?.color]};
            }
            .authorName {
            color: ${settings?.configs?.color[settings?.color]} !important;
            font-weight: bold;
            }
            `}
            </style>
            <MaintainedPageHeader path={"/"} linkPath={"/posts"} linkTitle={"Posts"}/>
            <Separator/>
            {
                posts
                    ? <>
                        <FiltersBar settings={settings}/>
                        <ClearPosts id={id} toMake={posts} setParentPosts={setPosts}/>
                        <div className={s.fixer}/>
                    </>
                    : <Skeleton height={"60px"} count={10}/>
            }
        </div>
    )
}

PostsContainer.propTypes = {
    match: PropTypes.object
}

export default withAsideBar(withRouter(PostsContainer));