import s from "./posts.module.css"
import PostItem from "./PostItem";
import {useEffect, useState, useMemo} from "react";
import commentsStyle from "../components/comments/comments.module.css";
import {v4 as uuidv4} from 'uuid';
import React from "react";
import {useSettings} from "../hooks";
import PropTypes from "prop-types";

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

    const postsLine = useMemo(() => posts ? posts?.map((post) => post) : [], [posts]);

    return (
        <div className={s.PostsCont + " onePostContainer"}>
            {postsLine}
        </div>
    )
}

ClearPosts.propTypes = {
    toMake: PropTypes.object,
    ignoreAppOpen: PropTypes.bool,
    id: PropTypes.number,
    setParentPosts: PropTypes.func
}

export default ClearPosts;