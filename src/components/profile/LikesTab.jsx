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
import {AiOutlineDislike, AiOutlineHeart, AiOutlineLike} from "react-icons/ai";
import {getElementsThemeConfig} from "../../utils";

forceCheck();

export function LikeDislikeTab({information, avatarUrl, isLike}) {
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
                onClick={() => postsHelper.getComment(history, information.postId, information?.id)}
            >
                <Avatar
                    style={{
                        height: '60px',
                        width: '60px',
                        ...getElementsThemeConfig({}, {isBoxShadow: true, boxShadowColor: "rgb(0,0,0)"})
                    }}
                    src={avatarUrl}
                    className={"conversationImg"}
                >
                </Avatar>
                <Box
                    className={s.UsersPost + " profilePostBorder"}
                    style={{width: "100%"}}
                >
                    <Avatar className={"conversationImg"} style={{flex: '1'}}>{relatedPost[0]?.createdBy[0]}</Avatar>
                    <Box style={{flex: '11'}}>
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
                            <Typography className={"fromNow"}>
                                {DateHelper.fromNow(relatedPost[0]?.createdAt)}
                            </Typography>
                        </Typography>
                        <Typography className={s.postContent}>{relatedPost[0]?.text}</Typography>

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
                    alignItems: "unset"
                }}
            >
                {isLike ? <AiOutlineLike size={"30px"} style={{
                        marginRight: '5px',
                        height: '16px'
                    }}/>
                    : <AiOutlineDislike size={"30px"} style={{
                        marginRight: '5px',
                        height: '16px'
                    }}/>
                }
                <span className={"fromNow"}>{DateHelper.fromNow(information?.createdAt)}</span>
            </Box>
        </Box>
    )
}

export function useEmotionConfig(config, avatarUrl, isLike) {
    return useMemo(() => config?.map((configElement, index) =>
        <LazyLoad key={index}>
            <LikeDislikeTab
                information={configElement}
                avatarUrl={avatarUrl}
                isLike={isLike}
            />
        </LazyLoad>
    ), [config]);
}

function LikesTab(props) {
    const {
        value,
        likesConfig,
        avatarUrl
    } = props;

    const likesLine = useEmotionConfig(likesConfig, avatarUrl, true)

    return (
        <TabPanel
            value={value}
            index={2}
        >
            {
                !!likesLine?.length
                    ? likesLine
                    : <p
                        className={s.EmptyLine}
                    >
                        <Typography
                            variant={"h3"}
                            component={"span"}
                        >You don’t have any likes yet</Typography>
                        Tap the like icon on any Post to show it some love. When you do, it’ll show up here.
                        <AiOutlineHeart/>
                    </p>
            }
        </TabPanel>
    )
}

export default LikesTab;