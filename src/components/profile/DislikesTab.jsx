import React from "react";
import {TabPanel} from "./UsersActivities";
import {TbHeartBroken} from "react-icons/all";
import {LikeDislikeTab} from "./LikesTab";
import PropTypes from "prop-types";
import UserActionsTab from "./UserActionsTab";

function DislikesTab(props) {
    const {
        value,
        dislikeConfig,
        avatarUrl
    } = props;

    return (
        <TabPanel value={value} index={3}>
            <UserActionsTab
                isLike={false}
                ContentTab={LikeDislikeTab}
                contentConfig={dislikeConfig}
                avatarUrl={avatarUrl}
                noContentCaption={"You don’t have any dislikes yet"}
                noContentText={"   Tap the dislike icon on any Post to take back some love. When you do, it’ll show up here."}
            >
                <TbHeartBroken/>
            </UserActionsTab>
        </TabPanel>
    )
}

DislikesTab.propTypes = {
    value: PropTypes.any,
    dislikeConfig: PropTypes.array,
    avatarUrl: PropTypes.string
};

export default DislikesTab;