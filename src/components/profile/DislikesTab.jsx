import React from "react";
import {TabPanel} from "./UsersActivities";
import {Typography} from "@mui/material";
import {TbHeartBroken} from "react-icons/all";
import {TabContainer, useEmotionConfig} from "./LikesTab";
import PropTypes from "prop-types";

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

DislikesTab.propTypes = {
    value: PropTypes.any,
    dislikeConfig: PropTypes.array,
    avatarUrl: PropTypes.string
};

export default DislikesTab;