import {TabPanel} from "./UsersActivities";
import {useEffect, useMemo, useState} from "react";
import {Avatar, Box, Typography} from "@mui/material";
import LazyLoad from 'react-lazyload';
import s from "./profile.module.css"
import {forceCheck} from 'react-lazyload';
import DateHelper from "../../helpers/dateHelper";
import postsHelper, {replaceTags} from "../../posts/postsHelper"
import {notify} from "../../App";
import EmotionsLineContainer from "../../posts/EmotionsLineContainer";
import {useHistory} from "react-router-dom";
import {AiOutlineClockCircle, AiOutlineDislike, AiOutlineHeart, AiOutlineLike} from "react-icons/ai";
import {getTabElementsThemeConfig} from "../../utils";
import {useSettings} from "../../hooks";

forceCheck();

export const getTabsImageStyle = () => ({height: '60px', width: '60px', marginLeft: '20px'})

export function LikeDislikeTab({information, avatarUrl, isLike}) {
    const history = useHistory();
    const {settings} = useSettings();
    const [relatedPost, setRelatedPost] = useState({});

    useEffect(() => {
        postsHelper.getSelectedPost(information?.postId, notify)
            .then((response) => setRelatedPost(response?.posts))
    }, []);

    return (
        <>
            {
                relatedPost[0]
                    ? <Box
                        className={s.UsersPost + " profilePostBorder"}
                        style={{flexDirection: "column", ...settings?.list?.listItemStyles}}
                    >
                        <Box
                            style={{display: "flex"}}
                            onClick={() => postsHelper.getComment(history, information.postId, information?.id)}
                        >
                            <Avatar
                                style={{...getTabsImageStyle(), ...getTabElementsThemeConfig()}}
                                src={avatarUrl}
                                className={"conversationImg"}
                            >
                            </Avatar>
                            <Box
                                className={s.UsersPost + " profilePostBorder"}
                                style={{width: "100%"}}
                            >
                                <Avatar className={"conversationImg"}>{relatedPost[0]?.createdBy[0]}</Avatar>
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
                                        <span className={"d-flex-c-c"}>
                                            <AiOutlineClockCircle style={{
                                                fontSize: '13px',
                                                marginRight: '3px'
                                            }}/>{DateHelper.fromNow(relatedPost[0]?.createdAt)}
                                        </span>
                                    </Typography>
                                    <Typography
                                        className={s.postContent}>{replaceTags(relatedPost[0]?.text || "", relatedPost[0]?.possibleMentions || JSON.stringify([]))}</Typography>

                                    <EmotionsLineContainer
                                        containerClass={s.ProfileEmotions}
                                        value={relatedPost[0] || {}}
                                        id={relatedPost[0]?.id}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box style={{display: "flex"}}>
                            <div style={{width: '85px'}}/>
                            <Box
                                style={{
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
                                <span className={"d-flex-c-c"}>
                                    <AiOutlineClockCircle style={{
                                        fontSize: '13px',
                                        marginRight: '3px'
                                    }}/>{DateHelper.fromNow(information?.createdAt)}
                                </span>
                            </Box>
                        </Box>
                    </Box>
                    : <Box className={s.UsersPost + " profilePostBorder"} style={{flexDirection: "column"}}
                    >User has deleted this post</Box>
            }
        </>
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