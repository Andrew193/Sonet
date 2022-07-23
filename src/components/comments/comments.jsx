import s from "./comments.module.css"
import DataHelper from "../../helpers/dateHelper"
import {v4 as uuidv4} from 'uuid';
import {useEffect, useMemo, useState} from "react";
import LazyLoad from 'react-lazyload';
import {Avatar, Box} from "@mui/material";
import profileHelper from "../profile/profileHelper";

function CommentItem(props) {
    const {
        value,
        commentId
    } = props;

    const [avatarUrl, setAvatarUrl] = useState("");

    useEffect(() => {
        async function getUserAvatar() {
            if (value?.userId && !avatarUrl) {
                const response = await profileHelper.getUser(value?.userId);

                try {
                    setAvatarUrl(JSON.parse(response?.data?.user?.avatar)?.webContentLink)
                } catch (error) {
                    setAvatarUrl(response?.data?.user?.avatar)
                }
            }
        }

        getUserAvatar();
    }, [value]);

    return (
        <div
            key={uuidv4()}
            style={{background: value?.id === commentId ? "#f3bdbd" : ""}}
        >
            <Box
                className={s.CommentsAvatarLine}
            >
                <Avatar
                    src={avatarUrl}
                    className={"conversationImg"}
                />
                <h2 className={"authorName"}>{value.createdBy}</h2>
            </Box>
            <p>{value.text}</p>
            <span className={"fromNow"}>{DataHelper.fromNow(value.createdAt)}</span>
        </div>
    )
}

function Comments(props) {
    const {
        toMake,
        commentId
    } = props;

    const postComments = useMemo(() => toMake.map((value, index) =>
        <LazyLoad
            key={index}
        >
            <CommentItem
                value={value}
                commentId={commentId}
            />
        </LazyLoad>
    ), [JSON.stringify(toMake)]);

    return (
        <div className={s.Comments}>
            {postComments}
        </div>
    )
}

export default Comments;