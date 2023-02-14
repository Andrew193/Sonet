import React from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import FollowersPageContent from "./FollowersPageContent";
import FollowersStyles from "../followings/followers.module.css"
import {useSettings} from "../hooks";
import {FollowersStylesConfig} from "./FollowersPageHelper";

export function FollowersFollowingCover(props: any) {
    const {settings} = useSettings();

    return (
        <div
            className={FollowersStyles.Container + " mainFollowContainer"}
            style={{
                background: settings?.configs?.background[settings?.background]
            }}
        >
            <style>{FollowersStylesConfig(settings)}</style>
            {props.children}
        </div>
    )
}

export type FollowersUsers = { userName: string, email: string, id: number }[]

export type FollowersPropsType = {
    users: FollowersUsers,
}

export type FollowersType = RouteComponentProps<any, Record<string, unknown>, FollowersPropsType>;

function Followers(props: FollowersType) {
    const users = props.location.state.users;

    return (<FollowersFollowingCover><FollowersPageContent users={users}/></FollowersFollowingCover>)
}

export default withRouter(Followers);