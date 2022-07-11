import {TabPanel} from "./UsersActivities";
import {useEffect, useMemo, useState} from "react";
import {Avatar, Box, Typography} from "@mui/material";
import LazyLoad from 'react-lazyload';
import s from "./profile.module.css"
import {forceCheck} from 'react-lazyload';
import DateHelper from "../../helpers/dateHelper";
import postsHelper from "../../posts/postsHelper"
import {notify} from "../../App";
import EmotionsLineContainer from "../../posts/EmotionsLineContainer";
import {useHistory} from "react-router-dom";

forceCheck();

function LikeTab({information, avatarUrl}) {
    const history = useHistory();
    const [relatedPost, setRelatedPost] = useState({});

    useEffect(() => {
        postsHelper.getSelectedPost(information?.postId || 1, notify)
            .then((response) => setRelatedPost(response?.posts))
    }, []);

    console.log(relatedPost)
    return (
        <Box
            className={s.UsersPost + " profilePostBorder"}
            style={{flexDirection: "column"}}
        >
            <Box
                style={{display: "flex"}}
                onClick={() => {
                    postsHelper.getComment(history, information.postId, information?.id)
                }}
            >
                <Avatar
                    src={avatarUrl}
                    className={"conversationImg"}
                >
                </Avatar>
                <Box>
                    <Typography
                        className={s.metaBar}
                    >
                        <Typography
                            variant={"h6"}
                            component={"h6"}
                        >
                            {information?.createdBy}
                        </Typography>
                        <Typography>
                            {DateHelper.fromNow(information.createdAt)}
                        </Typography>
                    </Typography>
                    <Typography
                        className={s.postContent}
                    >
                        {information?.text}
                    </Typography>
                </Box>
            </Box>
            <Box
                className={s.UsersPost + " profilePostBorder"}
                style={{
                    marginLeft: "15%",
                    padding: "5px"
                }}
            >
                <Avatar
                    className={"conversationImg"}
                >{relatedPost[0]?.createdBy[0]}</Avatar>
                <Box>
                    <Typography
                        className={s.metaBar}
                    >
                        <Typography
                            variant={"h6"}
                            component={"h6"}
                        >
                            {relatedPost[0]?.createdBy}
                        </Typography>
                        <Typography>
                            {DateHelper.fromNow(relatedPost[0]?.createdAt)}
                        </Typography>
                    </Typography>
                    <Typography
                        className={s.postContent}
                    >
                        {relatedPost[0]?.text}
                    </Typography>

                    <EmotionsLineContainer
                        containerClass={s.ProfileEmotions}
                        value={relatedPost[0] || {}}
                        id={relatedPost[0]?.id}
                    />
                </Box>
            </Box>
        </Box>
    )
}

function LikesTab(props) {
    const {
        value,
        commentsConfig,
        avatarUrl
    } = props;

    const commentsLine = useMemo(() => commentsConfig?.map((comment, index) =>
        <LazyLoad key={index}>
            <LikeTab
                information={comment}
                avatarUrl={avatarUrl}
            />
        </LazyLoad>
    ), [commentsConfig]);

    return (
        <TabPanel
            value={value}
            index={1}
        >
            {commentsLine}
        </TabPanel>
    )
}

export default LikesTab;