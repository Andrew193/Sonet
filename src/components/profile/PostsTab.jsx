import React from "react";
import {TabPanel} from "./UsersActivities";
import {Avatar, Box, Typography} from "@mui/material";
import ProfileStyles from "./profile.module.css"
import PostStyles from "../../posts/posts.module.css";
import DateHelper from "../../helpers/dateHelper";
import EmotionsLineContainer from "../../posts/EmotionsLineContainer";
import {getTabElementsThemeConfig} from "../../utils";
import {replaceTags} from "../../posts/postsHelper";
import {getTabsImageStyle} from "./LikesTab";
import {useSettings} from "../../hooks";
import {AiOutlineClockCircle} from "react-icons/ai";
import PropTypes from "prop-types";
import UserActionsTab from "./UserActionsTab";
import {MdOutlinePostAdd} from "react-icons/all";

function UserPostTab({information, avatarUrl}) {
    const {settings} = useSettings();

    return (
        <Box
            className={ProfileStyles.UsersPost + " profilePostBorder"}
            style={settings?.list?.listItemStyles}
        >
            <Avatar
                src={avatarUrl}
                style={{...getTabsImageStyle(), ...getTabElementsThemeConfig()}}
                className={"conversationImg"}
            >
            </Avatar>
            <Box
                style={{
                    width: '100%'
                }}
            >
                <Typography className={ProfileStyles.metaBar}>
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
                <Typography className={ProfileStyles.postContent}>
                    {replaceTags(information?.text || "", information?.possibleMentions || JSON.stringify([]))}
                </Typography>

                <div className={PostStyles.PostsCont}>
                    <EmotionsLineContainer
                        containerClass={PostStyles.EmotionContainer}
                        value={information}
                        id={information?.id}
                    />
                </div>
            </Box>
        </Box>
    )
}

UserPostTab.propTypes = {
    information: PropTypes.object,
    avatarUrl: PropTypes.string
};

function PostsTab(props) {
    const {
        value,
        postsConfig,
        avatarUrl
    } = props;

    return (
        <TabPanel value={value} index={0}>
            <UserActionsTab
                ContentTab={UserPostTab}
                contentConfig={postsConfig}
                avatarUrl={avatarUrl}
                noContentCaption={"You don’t have any posts yet"}
                noContentText={"Create a post in any way. When you do, it’ll show up here."}
            >
                <MdOutlinePostAdd/>
            </UserActionsTab>
        </TabPanel>
    )
}

PostsTab.propTypes = {
    value: PropTypes.number,
    postsConfig: PropTypes.array,
    avatarUrl: PropTypes.string
};

export default PostsTab;