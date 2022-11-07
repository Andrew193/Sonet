import {TabPanel} from "./UsersActivities";
import {useMemo} from "react";
import {Avatar, Box, Typography} from "@mui/material";
import LazyLoad from 'react-lazyload';
import s from "./profile.module.css"
import postS from "../../posts/posts.module.css";
import {forceCheck} from 'react-lazyload';
import DateHelper from "../../helpers/dateHelper";
import EmotionsLineContainer from "../../posts/EmotionsLineContainer";
import {MdOutlinePostAdd} from "react-icons/all";
import {getTabElementsThemeConfig} from "../../utils";
import {replaceTags} from "../../posts/postsHelper";
import {getTabsImageStyle} from "./LikesTab";
import {useSettings} from "../../hooks";
import {AiOutlineClockCircle} from "react-icons/ai";

forceCheck();

function UserPostTab({information, avatarUrl}) {
    const {settings} = useSettings();

    return (
        <Box
            className={s.UsersPost + " profilePostBorder"}
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

                <div className={postS.PostsCont}>
                    <EmotionsLineContainer
                        containerClass={postS.EmotionContainer}
                        value={information}
                        id={information?.id}
                    />
                </div>
            </Box>
        </Box>
    )
}

function PostsTab(props) {
    const {
        value,
        postsConfig,
        avatarUrl
    } = props;

    const postsLine = useMemo(() => postsConfig?.map((post, index) =>
        <LazyLoad key={index}>
            <UserPostTab
                information={post}
                avatarUrl={avatarUrl}
            />
        </LazyLoad>
    ), [postsConfig]);

    return (
        <TabPanel
            value={value}
            index={0}
        >
            {
                !!postsLine?.length
                    ? postsLine
                    : <p
                        className={s.EmptyLine}
                    >
                        <Typography
                            variant={"h3"}
                            component={"span"}
                        >You don’t have any posts yet</Typography>
                        Create a post in any way. When you do, it’ll show up here.
                        <MdOutlinePostAdd/>
                    </p>
            }
        </TabPanel>
    )
}

export default PostsTab;