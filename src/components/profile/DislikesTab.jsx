import {TabPanel} from "./UsersActivities";
import {Typography} from "@mui/material";
import {forceCheck} from 'react-lazyload';
import {TbHeartBroken} from "react-icons/all";
import {TabContainer, useEmotionConfig} from "./LikesTab";

forceCheck();

function DislikesTab(props) {
    const {
        value,
        dislikeConfig,
        avatarUrl
    } = props;

    const dislikesLine = useEmotionConfig(dislikeConfig, avatarUrl)

    return (
        <TabPanel
            value={value}
            index={3}
        >
            <TabContainer valueLine={dislikesLine}>
                <Typography
                    variant={"h3"}
                    component={"span"}
                >You don’t have any dislikes yet</Typography>
                Tap the dislike icon on any Post to take back some love. When you do, it’ll show up here.
                <TbHeartBroken/>
            </TabContainer>
        </TabPanel>
    )
}

export default DislikesTab;