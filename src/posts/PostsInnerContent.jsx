import s from "./posts.module.css"
import PostItem from "./PostItem";
import {useEffect, useState, useMemo} from "react";
import commentsStyle from "../components/comments/comments.module.css";
import LazyLoad, {forceCheck} from 'react-lazyload';

forceCheck();

function ClearPosts(props) {
    const {
        toMake,
        ignoreAppOpen,
        id,
        settings,
        setParentPosts
    } = props;

    const [posts, setPost] = useState(false)

    useEffect(() => {
        setPost(() => (toMake?.posts || [])?.map((value, index) =>
            (value?.show === true || value?.show === undefined)
                ? <PostItem
                    value={value}
                    id={id}
                    ignoreAppOpen={ignoreAppOpen}
                    index={index}
                    setPost={setPost}
                    setParentPosts={setParentPosts}
                    customStyle={toMake?.customClass || commentsStyle.OnePost}
                    settings={settings}
                    key={index}
                />
                : null
        ))
    }, [JSON.stringify(toMake), settings])

    const postsLine = useMemo(() => {
        if (!!posts) {
            return posts?.map((post, index) =>
                <LazyLoad key={index}>
                    {post}
                </LazyLoad>
            )
        }
        return [];
    }, [posts]);

    return (
        <div className={s.PostsCont + " onePostContainer"}>
            {postsLine}
        </div>
    )
}

export default ClearPosts;