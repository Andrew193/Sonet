import React from "react";
import {TabPanel} from "./UsersActivities";
import {useEffect, useMemo, useState} from "react";
import {Avatar, Box, Typography} from "@mui/material";
import s from "./profile.module.css"
import DateHelper from "../../helpers/dateHelper";
import postsHelper, {replaceTags} from "../../posts/postsHelper"
import {notify} from "../../App";
import EmotionsLineContainer from "../../posts/EmotionsLineContainer";
import {useHistory} from "react-router-dom";
import {BiMessageMinus} from "react-icons/all";
import {getTabElementsThemeConfig} from "../../utils";
import {getTabsImageStyle} from "./LikesTab";
import {useSettings} from "../../hooks";
import {AiOutlineClockCircle} from "react-icons/ai";
import PropTypes from "prop-types";

function CommentTab({information, avatarUrl}) {
    const history = useHistory();
    const {settings} = useSettings();
    const [relatedPost, setRelatedPost] = useState({});

    useEffect(() => {
        postsHelper.getSelectedPost(information?.postId || 1, notify)
            .then((response) => setRelatedPost(response?.posts))
    }, []);

    return (
        <Box
            className={s.UsersPost + " profilePostBorder"}
            style={{flexDirection: "column", ...settings?.list?.listItemStyles}}
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
                    style={{...getTabsImageStyle(), ...getTabElementsThemeConfig()}}
                >
                </Avatar>
                <Box style={{width: '100%'}}>
                    <Typography className={s.metaBar}>
                        <Typography
                            variant={"h6"}
                            component={"span"}
                            style={{
                                fontWeight: '600'
                            }}
                        >
                            {information?.createdBy}
                        </Typography>
                        <span className={"d-flex-c-c"}>
                            <AiOutlineClockCircle style={{
                                fontSize: '13px',
                                marginRight: '3px'
                            }}/>{DateHelper.fromNow(information.createdAt)}
                        </span>
                    </Typography>
                    <Typography className={s.postContent}>
                        {replaceTags(information?.text || "", information?.possibleMentions || JSON.stringify([]))}
                    </Typography>
                </Box>
            </Box>
            <Box
                className={s.UsersPost + " profilePostBorder"}
                style={{
                    marginLeft: "20%",
                    padding: "5px"
                }}
            >
                <Avatar
                    className={"conversationImg"}
                >{relatedPost[0]?.createdBy[0]}</Avatar>
                <Box style={{width: "100%"}}>
                    <Typography className={s.metaBar}>
                        <Typography
                            variant={"h6"}
                            component={"span"}
                            style={{
                                fontWeight: '600'
                            }}
                        >
                            {relatedPost[0]?.createdBy}
                        </Typography>
                        <span className={"d-flex-c-c"}>
                            <AiOutlineClockCircle style={{
                                fontSize: '13px',
                                marginRight: '3px'
                            }}/>{DateHelper.fromNow(relatedPost[0]?.createdAt)}
                        </span>
                    </Typography>
                    <Typography className={s.postContent}>
                        {replaceTags(relatedPost[0]?.text || "", relatedPost[0]?.possibleMentions || JSON.stringify([]))}
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

CommentTab.propTypes = {
    information: PropTypes.object,
    avatarUrl: PropTypes.string
};

function CommentsTab(props) {
    const {
        value,
        commentsConfig,
        avatarUrl
    } = props;

    const commentsLine = useMemo(() => commentsConfig?.map((comment, index) =>
            <CommentTab
                key={index}
                information={comment}
                avatarUrl={avatarUrl}
            />
    ), [commentsConfig]);

    return (
        <TabPanel
            value={value}
            index={1}
        >
            {
                commentsLine?.length
                    ? commentsLine
                    : <p className={s.EmptyLine}>
                        <Typography
                            variant={"h3"}
                            component={"span"}
                        >You don’t have any comments yet</Typography>
                        Tap the comment icon on any Post to comment it out. When you do, it’ll show up here.
                        <BiMessageMinus/>
                    </p>
            }
        </TabPanel>
    )
}

CommentsTab.propTypes = {
    value: PropTypes.any,
    commentsConfig: PropTypes.array,
    avatarUrl: PropTypes.string
};

export default CommentsTab;