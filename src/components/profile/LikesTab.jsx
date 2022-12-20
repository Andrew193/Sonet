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
import {AiOutlineClockCircle, AiOutlineDislike, AiOutlineHeart, AiOutlineLike} from "react-icons/ai";
import {getTabElementsThemeConfig} from "../../utils";
import {useSettings} from "../../hooks";
import TableLoader from "../table-loader/TableLoader";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";

const actionIconSetup = (() => ({
    style: {
        marginRight: '5px',
        height: '16px'
    },
    size: "30px"
}))()

export const getTabsImageStyle = () => ({height: '60px', width: '60px', marginLeft: '20px'})

export function LikeDislikeTab({information, avatarUrl, isLike}) {
    const history = useHistory();
    const {settings} = useSettings();
    const [relatedPost, setRelatedPost] = useState(null);

    useEffect(() => {
        postsHelper.getSelectedPost(information?.postId, notify)
            .then((response) => setRelatedPost(response?.posts))
    }, []);

    return (
        <>
            {
                relatedPost
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
                                id={"NoHover"}
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
                                {isLike ? <AiOutlineLike {...actionIconSetup}/> : <AiOutlineDislike {...actionIconSetup}/>}
                                <span className={"d-flex-c-c"}>
                                    <AiOutlineClockCircle style={{
                                        fontSize: '13px',
                                        marginRight: '3px'
                                    }}/>{DateHelper.fromNow(information?.createdAt)}
                                </span>
                            </Box>
                        </Box>
                    </Box>
                    : relatedPost === null ? null :
                        <Box className={s.UsersPost + " profilePostBorder"} style={{flexDirection: "column"}}
                        >User has deleted this post</Box>
            }
        </>
    )
}

LikeDislikeTab.propTypes = {
    information: PropTypes.object,
    avatarUrl: PropTypes.string,
    isLike: PropTypes.bool
};

export function useEmotionConfig(config, avatarUrl, isLike) {
    return useMemo(() => config?.length ? config?.map((configElement, index) =>
            <LikeDislikeTab
                key={index}
                information={configElement}
                avatarUrl={avatarUrl}
                isLike={isLike}
            />
    ) : null, [config]);
}

export function TabContainer(props) {
    const {
        valueLine,
        children
    } = props;

    const [spareLoader, setSpareLoader] = useState(true);
    const {t} = useTranslation();

    useEffect(() => {
        const id = setTimeout(() => {
            clearTimeout(id);
            setSpareLoader(() => false);
        }, 3000)
    }, [])

    return (
        <>
            {
                valueLine?.length
                    ? valueLine
                    : valueLine === null && spareLoader ?
                        <TableLoader loaderLabel={t("We are loading your pretty content")}/> :
                        <p className={s.EmptyLine}>{children}</p>
            }
        </>
    )
}

TabContainer.propTypes = {
    valueLine: PropTypes.array,
    children: PropTypes.node
};

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
            <TabContainer valueLine={likesLine}>
                <Typography
                    variant={"h3"}
                    component={"span"}
                >You don’t have any likes yet</Typography>
                Tap the like icon on any Post to show it some love. When you do, it’ll show up here.
                <AiOutlineHeart/>
            </TabContainer>
        </TabPanel>
    )
}

LikesTab.propTypes = {
    value: PropTypes.any,
    likesConfig: PropTypes.array,
    avatarUrl: PropTypes.string
};

export default LikesTab;