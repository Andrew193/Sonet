import React from "react";
import {Box, Tab, Tabs, Typography} from "@mui/material";
import {useEffect, useState, useMemo} from "react";
import s from "./profile.module.css"
import HttpHelper from "../../helpers/httpHelper";
import PostsTab from "./PostsTab";
import profileHelper from "./profileHelper";
import {useTranslation} from "react-i18next";
import CommentsTab from "./CommentsTab";
import LikesTab from "./LikesTab";
import DislikesTab from "./DislikesTab";
import PropTypes from "prop-types";
import {getImageLinkFromStaticObject} from "../../utils";

export function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    value: PropTypes.number,
    index: PropTypes.number
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function getPosts(setPosts, id) {
    HttpHelper.POSTS.getPosts(null, "my", `&userId=${id}`)
        .then(response => {
            setPosts(response.posts)
        })
        .catch(error => {
            console.error(error)
        })
}

function UsersActivities(props) {
    const {
        userInfo
    } = props;

    const {t} = useTranslation();

    const [value, setValue] = useState(0);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [dislikes, setDislikes] = useState([]);
    const avatarUrl = useMemo(() => getImageLinkFromStaticObject(userInfo?.avatar), [userInfo?.avatar])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (userInfo.id) {
            if (value === 0) {
                getPosts(setPosts, userInfo?.id)
            } else if (value === 1) {
                profileHelper.getMyComments(`${userInfo?.id}`, setComments)
            } else if (value === 2) {
                profileHelper.getLikes(`${userInfo?.id}`, setLikes)
            } else if (value === 3) {
                profileHelper.getDislikes(`${userInfo?.id}`, setDislikes)
            }
        }
    }, [value])

    return (
        <Box
            sx={{width: '100%'}}
            style={{
                transition: 'all ease 0.7s'
            }}
        >
            <Box
                sx={{borderBottom: 1, borderColor: 'divider'}}
                className={s.TabsContainer}
            >
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab
                        className={s.Tab}
                        label={t("Posts")}
                        {...a11yProps(0)}
                    />
                    <Tab
                        className={s.Tab}
                        label={t("Comments")}
                        {...a11yProps(1)}
                    />
                    <Tab
                        className={s.Tab}
                        label={t("Likes")}
                        {...a11yProps(2)}
                    />
                    <Tab
                        className={s.Tab}
                        label={t("Dislikes")}
                        {...a11yProps(2)}
                    />
                </Tabs>
            </Box>
            <PostsTab
                value={value}
                postsConfig={posts}
                avatarUrl={avatarUrl}
            />
            <CommentsTab
                value={value}
                commentsConfig={comments}
                avatarUrl={avatarUrl}
            />
            <LikesTab
                value={value}
                likesConfig={likes}
                avatarUrl={avatarUrl}
            />
            <DislikesTab
                value={value}
                dislikeConfig={dislikes}
                avatarUrl={avatarUrl}
            />

            <div style={{height: "90px"}}/>
        </Box>
    )
}

UsersActivities.propTypes = {
    userInfo: PropTypes.object
};

export default UsersActivities;