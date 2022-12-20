import React from "react";
import s from "./comments.module.css"
import DataHelper from "../../helpers/dateHelper"
import {v4 as uuidv4} from 'uuid';
import {useEffect, useMemo, useState} from "react";
import {Avatar, Box} from "@mui/material";
import PropTypes from "prop-types";
import {getUserAvatar} from "../../posts/postsHelper";

function CommentItem(props) {
    const {
        value,
        commentId
    } = props;

    const [avatarUrl, setAvatarUrl] = useState("");

    useEffect(() => {
        getUserAvatar(avatarUrl, setAvatarUrl, value?.userId)
    }, [value]);

    return (
        <div
            key={uuidv4()}
            style={{background: value?.id === commentId ? "#f3bdbd" : ""}}
        >
            <Box className={s.CommentsAvatarLine}>
                <Avatar
                    src={avatarUrl}
                    className={"conversationImg"}
                />
                <h2 className={"authorName"}>{value.createdBy}</h2>
            </Box>
            <p>{value.text}</p>
            <li>{DataHelper.fromNow(value.createdAt)}</li>
        </div>
    )
}

CommentItem.propTypes = {
    value: PropTypes.object,
    commentId: PropTypes.number
};

function Comments(props) {
    const {
        toMake,
        commentId
    } = props;

    const postComments = useMemo(() => toMake.map((value, index) =>
        <CommentItem
            key={index}
            value={value}
            commentId={commentId}
        />
    ), [JSON.stringify(toMake)]);

    return (
        <div className={s.Comments}>
            {postComments}
        </div>
    )
}

Comments.propTypes = {
    toMake: PropTypes.array,
    commentId: PropTypes.number
};

export default Comments;