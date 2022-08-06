import {useContext, useEffect, useState} from "react";
import Skeleton from 'react-loading-skeleton';
import s from "./posts.module.css"
import {withRouter} from "react-router-dom";
import Script from "./postsHelper"
import ClearSpecialPost from "./ClearSpecialPost";
import Context from "../helpers/contextHelper";
import {alpha} from "@mui/material";
import {getSettings} from "../db";

function SpecialPosts(props) {
    const id = props.location.state.id;

    const {
        type
    } = props.match.params;

    const {socket} = useContext(Context);

    const [posts, setPosts] = useState(false);
    const [settings, setSettings] = useState({});

    socket.on(type === "notMy" ? "notMyPostUpdate" : "MyPostUpdate", (updatedPosts) => {
        setPosts({posts: updatedPosts})
    });

    useEffect(() => {
        Script.getMyPostWithEndpoint(id, setPosts, type === "notMy" ? "notMy" : "my")
    }, [id, type]);

    useEffect(() => {
        async function getData() {
            const response = await getSettings();

            setSettings(response[0])
        }

        getData();
    }, [])

    return (
        <div
            className={s.Container}
            id={s.HF}
            style={{
                height: '-webkit-fill-available',
                background: settings?.configs?.background[settings?.background],
                borderLeft: `1px solid ${settings?.configs?.color[settings?.color]}`,
                borderRight: `1px solid ${settings?.configs?.color[settings?.color]}`
            }}
        >
            <style>
                {`
                     .itemsPostsPage {
                     background: ${settings?.configs?.background[settings?.background]};
                     cursor: pointer;
                     }
                     .itemsPostsPage:nth-child(2n) {
                     background-color: ${alpha(settings?.configs?.color[settings?.color] || "rgb(231 231 240)", 0.3)} !important;
                     }
                     .itemsPostsPage:hover {
                     background-color: ${alpha(settings?.configs?.color[settings?.color] || "rgb(231 231 240)", 0.5)} !important;
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
            {
                posts
                    ? <ClearSpecialPost id={id} posts={posts}/>
                    : <Skeleton height={"50px"} count={5}/>
            }
        </div>
    )
}

export default withRouter(SpecialPosts)