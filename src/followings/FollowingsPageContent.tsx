import withPageHeader from "../hoc/withPageHeader";
import FollowersCreator from "./Creator";
import {FollowersPropsType} from "../followers/FollowersPageContainer";
import React from "react";

function FollowingsPageContentWrapper(props: FollowersPropsType) {
    const {
        users
    } = props;

    return (<FollowersCreator usersList={users}/>)
}

export default withPageHeader(FollowingsPageContentWrapper, {path: "/profile", Title: "Followings"})