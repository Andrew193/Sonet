import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {Typography} from "@mui/material";
import {TabContainer} from "./LikesTab";

function UserActionsTab(props) {
    const {
        ContentTab,
        contentConfig,
        avatarUrl,
        noContentCaption,
        noContentText,
        children,
        isLike
    } = props;

    const contentLine = useMemo(() => contentConfig?.length ? contentConfig?.map((information, index) =>
        <ContentTab
            isLike={isLike}
            key={index}
            information={information}
            avatarUrl={avatarUrl}
        />
    ) : null, [contentConfig]);

    return (<TabContainer valueLine={contentLine}>
        <Typography variant={"h3"} component={"span"}>{noContentCaption}</Typography>
        {noContentText}
        {children}
    </TabContainer>)
}

UserActionsTab.propTypes = {
    isLike: PropTypes.bool,
    ContentTab: PropTypes.any,
    contentConfig: PropTypes.array,
    avatarUrl: PropTypes.string,
    noContentCaption: PropTypes.string,
    noContentText: PropTypes.string,
    children: PropTypes.any
};

export default UserActionsTab;