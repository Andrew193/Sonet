import {TabPanel} from "./UsersActivities";
import {useMemo} from "react";
import {Avatar, Box, Typography} from "@mui/material";
import LazyLoad from 'react-lazyload';
import s from "./profile.module.css"
import {forceCheck} from 'react-lazyload';
import DateHelper from "../../helpers/dateHelper";
import EmotionsLineContainer from "../../posts/EmotionsLineContainer";

forceCheck();

function UserPostTab({information, avatarUrl}) {

    return (
        <Box
            className={s.UsersPost + " profilePostBorder"}
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
            {postsLine}
        </TabPanel>
    )
}

export default PostsTab;