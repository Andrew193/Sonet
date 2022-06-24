import {Box, Tab, Tabs, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import s from "./profile.module.css"
import HttpHelper from "../../helpers/httpHelper";

function TabPanel(props) {
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
                <Box sx={{p: 3}}>
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

function UsersActivities() {
    const [value, setValue] = useState(0);
    const [posts, setPosts] = useState([]);
    const userInformation = JSON.parse(localStorage.getItem("userInfo"));

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (userInformation.id) {
            if (value === 0) {
                HttpHelper.getPosts(null, "my", `&userId=${userInformation.id}`)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => {
                        console.error(error)
                    })
            } else if (value === 1) {

            }
        }
    }, [value])

    return (
        <Box sx={{width: '100%'}}>
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
            <TabPanel value={value} index={0}>
                Item One
            </TabPanel>
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