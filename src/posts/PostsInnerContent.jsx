import s from "./posts.module.css"
import PostItem from "./PostItem";
import {useEffect, useState, useMemo} from "react";
import commentsStyle from "../components/comments/comments.module.css";
import LazyLoad, {forceCheck} from 'react-lazyload';
import {v4 as uuidv4} from 'uuid';
import {useSettings} from "../hooks";

forceCheck();

function ClearPosts(props) {
    const {
        toMake,
        ignoreAppOpen,
        id,
        setParentPosts
    } = props;

    const [posts, setPost] = useState(false)
    const {settings} = useSettings();

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
                    key={uuidv4()}
                />
                : null
        ))
    }, [JSON.stringify(toMake), settings])

    const postsLine = useMemo(() => !!posts ? posts?.map((post) => <LazyLoad
        key={uuidv4()}>{post}</LazyLoad>) : [], [posts]);

    return (
        <div className={s.PostsCont + " onePostContainer"}>
            {postsLine}
        </div>
    )
}

export default ClearPosts;