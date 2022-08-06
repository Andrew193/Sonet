import {useContext, useEffect, useState} from "react";
import ClearPosts from "./PostsInnerContent";
import postsHelper from "./postsHelper"
import Skeleton from 'react-loading-skeleton';
import SortLine from "./SortLine.jsx"
import s from "./posts.module.css"
import {Link, withRouter} from "react-router-dom";
import PageHeader from "../components/common/navigationLine/NavigationLine.jsx";
import Context from "../helpers/contextHelper";
import {getSettings} from "../db";
import {alpha, hexToRgb} from "@mui/material";

function PostsContainer(props) {
    const [posts, setPosts] = useState(false);
    const [settings, setSettings] = useState({});

    const {socket, notify} = useContext(Context);

    const {id} = JSON.parse(localStorage.getItem("userInfo"));

    socket.on("postUpdate", (updatedPosts) => {
        setPosts({posts: updatedPosts})
    });

    useEffect(() => {
        const id = props.match.params.id;

        if (id && typeof (+id) === "number") {
            postsHelper.getSelectedPost(+id)
                .then((postF) => setPosts(postF))
                .catch((error) => {
                    error && notify(error?.response?.data?.posts)
                })
        } else {
            postsHelper.getPosts()
                .then((postF) => setPosts(postF))
                .catch((error) => {
                    error && notify(error?.response?.data?.error)
                })
        }
    }, [notify, props.match.params.id]);

    useEffect(() => {
        async function getData() {
            const response = await getSettings();

            setSettings(response[0])
        }

        getData();
    }, [])

    return (
        <div className={s.Container}>
            <style>{`
            .inputCover {
            position: absolute!important;
            z-index: 10;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: ${alpha(hexToRgb(settings?.configs?.color[settings?.color] || "#f6f2ff"), 0.4)}!important;
            }
            .inputCover > div{
             height: 100%;
            }
            .${s.Item} .fromNow:before {
            top: 11px !important;
            }
            .${s.Container} {
            background: ${settings?.configs?.background[settings?.background]};
            }
            .itemsPostsPage {
            background: ${settings?.configs?.background[settings?.background]};
            border-left: 1px solid ${settings?.configs?.color[settings?.color]};
            border-right: 1px solid ${settings?.configs?.color[settings?.color]};
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
            border-left: 1px solid ${settings?.configs?.color[settings?.color]};
            border-right: 1px solid ${settings?.configs?.color[settings?.color]};
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
            <PageHeader historyPath={"/"}>
                <Link to={{pathname: "/posts"}}>Posts</Link>
            </PageHeader>
            <div
                className={"Separator"}
                onClick={(e) => {
                    e.target.nextElementSibling.classList.toggle("Hide")
                }}
            />
            {
                posts
                    ? <>
                        <ClearPosts id={id} toMake={posts} settings={settings} setParentPosts={setPosts}/>
                        <div className={s.fixer}/>
                        <SortLine/>
                    </>
                    : <Skeleton height={"60px"} count={10}/>
            }
        </div>
    )
}

export default withRouter(PostsContainer);