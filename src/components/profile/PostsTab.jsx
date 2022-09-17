import {TabPanel} from "./UsersActivities";
import {useMemo} from "react";
import {Avatar, Box, Typography} from "@mui/material";
import LazyLoad from 'react-lazyload';
import s from "./profile.module.css"
import {forceCheck} from 'react-lazyload';
import DateHelper from "../../helpers/dateHelper";
import EmotionsLineContainer from "../../posts/EmotionsLineContainer";
import {MdOutlinePostAdd} from "react-icons/all";
import {getElementsThemeConfig} from "../../utils";

forceCheck();

function UserPostTab({information, avatarUrl}) {

    return (
        <Box
            className={s.UsersPost + " profilePostBorder"}
        >
            <Avatar
                src={avatarUrl}
                style={{
                    marginLeft: '20px',
                    height: '60px',
                    width: '60px',
                    ...getElementsThemeConfig({}, {isBoxShadow: true, boxShadowColor: "rgb(0,0,0)"})
                }}
                className={"conversationImg"}
            >
            </Avatar>
            <Box
                style={{
                    width: '100%'
                }}
            >
                <Typography
                    className={s.metaBar}
                >
                    <Typography
                        variant={"h6"}
                        component={"span"}
                        style={{
                            fontWeight: '600'
                        }}
                    >
                        {information?.createdBy}
                    </Typography>
                    <Typography className={"fromNow"}>
                        {DateHelper.fromNow(information.createdAt)}
                    </Typography>
                </Typography>
                <Typography
                    className={s.postContent}
                >
                    {information?.text}
                </Typography>

                <EmotionsLineContainer
                    containerClass={s.ProfileEmotions}
                    value={information}
                    id={information?.id}
                />
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
        <LazyLoad
            key={index}
        >
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