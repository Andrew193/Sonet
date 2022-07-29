import s from "./posts.module.css"
import PostItem from "./PostItem";
import {useEffect, useState} from "react";
import commentsStyle from "../components/comments/comments.module.css";
import {alpha, hexToRgb} from "@mui/material";

function ClearPosts(props) {
    const {
        toMake,
        id,
        settings,
        setParentPosts
    } = props;

    const [posts, setPost] = useState(false)

    useEffect(() => {
        setPost(() => toMake.posts.map((value, index) =>
            <PostItem
                value={value}
                id={id}
                index={index}
                setPost={setPost}
                setParentPosts={setParentPosts}
                customStyle={toMake?.customClass || commentsStyle.OnePost}
                settings={settings}
                key={index}
            />))
    }, [JSON.stringify(toMake), settings])

    return (
        <div className={s.PostsCont + " onePostContainer"}>
            {posts}
        </div>
    )
}

export default ClearPosts;