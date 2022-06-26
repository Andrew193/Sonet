import {Box, Tab, Tabs, Typography} from "@mui/material";
import {useEffect, useState, useMemo} from "react";
import s from "./profile.module.css"
import HttpHelper from "../../helpers/httpHelper";
import PostsTab from "./PostsTab";

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

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function getPosts(setPosts, id) {
    HttpHelper.getPosts(null, "my", `&userId=${id}`)
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

    const [value, setValue] = useState(0);
    const [posts, setPosts] = useState([]);

    const avatarUrl = useMemo(() => {
        try {
            return JSON.parse(userInfo?.avatar)?.webContentLink;
        } catch (error) {
            return userInfo?.avatar;
        }
    }, [userInfo?.avatar])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (userInfo.id) {
            if (value === 0) {
                getPosts(setPosts, userInfo?.id)
            } else if (value === 1) {

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
                        label="Posts"
                        {...a11yProps(0)}
                    />
                    <Tab
                        className={s.Tab}
                        label="Comments"
                        {...a11yProps(1)}
                    />
                    <Tab
                        className={s.Tab}
                        label="Likes"
                        {...a11yProps(2)}
                    />
                </Tabs>
            </Box>
           <PostsTab
               value={value}
               postsConfig={posts}
               avatarUrl={avatarUrl}
           />
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>

            <div
                style={{
                    height: "90px"
                }}
            />
        </Box>
    )
}

export default UsersActivities;