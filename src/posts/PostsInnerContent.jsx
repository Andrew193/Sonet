import s from "./posts.module.css"
import PostItem from "./PostItem";
import {useEffect, useState} from "react";
import commentsStyle from "../components/comments/comments.module.css";

function ClearPosts(props) {
    const {
        toMake,
        id,
        settings
    } = props;

    const [posts, setPost] = useState(false)

    useEffect(() => {
        if (!posts) {
            setPost(() => toMake.posts.map((value, index) =>
                <PostItem
                    value={value}
                    id={id}
                    customStyle={toMake?.customClass || commentsStyle.OnePost}
                    settings={settings}
                    key={index}
                />))
        }
    }, [])

    return (
        <div className={s.PostsCont + " onePostContainer"}>
            {posts}
        </div>
    )
}

export default ClearPosts;