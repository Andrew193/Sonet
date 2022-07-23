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
import {AiOutlineDislike} from "react-icons/ai";
import {TbHeartBroken} from "react-icons/all";

forceCheck();

function DislikeTab({information, avatarUrl}) {
    const history = useHistory();
    const [relatedPost, setRelatedPost] = useState({});

    useEffect(() => {
        postsHelper.getSelectedPost(information?.postId || 1, notify)
            .then((response) => setRelatedPost(response?.posts))
    }, []);

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
                <Box
                    className={s.UsersPost + " profilePostBorder"}
                    style={{
                        width: "100%"
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
            <Box
                style={{
                    marginLeft: "7%",
                    padding: "5px",
                    display: "flex",
                    alignItems: "end"
                }}
            >
                <AiOutlineDislike size={"30px"}/>
                <span> {DateHelper.fromNow(information?.createdAt)}</span>
            </Box>
        </Box>
    )
}

function DislikesTab(props) {
    const {
        value,
        dislikeConfig,
        avatarUrl
    } = props;

    const dislikesLine = useMemo(() => dislikeConfig?.map((dislike, index) =>
        <LazyLoad key={index}>
            <DislikeTab
                information={dislike}
                avatarUrl={avatarUrl}
            />
        </LazyLoad>
    ), [dislikeConfig]);

    return (
        <TabPanel
            value={value}
            index={3}
        >
            {
                !!dislikesLine?.length
                    ? dislikesLine
                    : <p
                        className={s.EmptyLine}
                    >
                        <Typography
                            variant={"h3"}
                            component={"h3"}
                        >You don’t have any dislikes yet</Typography>
                        Tap the dislike icon on any Post to take back some love. When you do, it’ll show up here.
                        <TbHeartBroken/>
                    </p>
            }
        </TabPanel>
    )
}

export default DislikesTab;