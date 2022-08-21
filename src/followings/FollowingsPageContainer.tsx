import {withRouter} from "react-router-dom";
import FollowingsPageContent from "./FollowingsPageContent";
import s from "./followers.module.css"
import {alpha} from "@mui/material";
import {FollowersType} from "../followers/FollowersPageContainer";
import {useSettings} from "../hooks";

function Followers(props: FollowersType) {
    const users = props.location.state.users;
    const {settings} = useSettings();

    return (
        <div
            className={s.Container + " mainFollowContainer"}
            style={{
                background: settings?.configs?.background[settings?.background]
            }}
        >
            <style>
                {`
                     .mainFollowContainer {
                     border-left: 1px solid ${settings?.configs?.color[settings?.color]};
                     border-right: 1px solid ${settings?.configs?.color[settings?.color]};
                     } 
                     .followerOrFollowingContainer {
                     background: ${settings?.configs?.background[settings?.background]};
                     cursor: pointer;
                     }
                     .followerOrFollowingContainer:nth-child(2n) {
                     background-color: ${alpha(settings?.configs?.color[settings?.color] || "rgb(231 231 240)", 0.3)} !important;
                     }
                     .followerOrFollowingContainer:hover {
                     background-color: ${alpha(settings?.configs?.color[settings?.color] || "rgb(231 231 240)", 0.5)} !important;
                     }
                     .basicPageHead {
                      background: ${settings?.configs?.background[settings?.background]} !important;
                     }
                     .authorName {
                     color: ${settings?.configs?.color[settings?.color]} !important;
                     font-weight: bold;
                     }
                `}
            </style>
            <FollowingsPageContent users={users}/>
        </div>
    )
}

export default withRouter(Followers);