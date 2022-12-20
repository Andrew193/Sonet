import s from "./users.module.css"
import React from "react";
import Script from "./script"
import {toast} from "react-toastify"
import {buttonsConfig} from "../create-post/CreatePostLine";
import {AiOutlineEye, AiOutlineUserAdd, AiOutlineUsergroupAdd} from "react-icons/ai";
import {USER_INFORMATION} from "../vars";
import {getItemFromLocalStorage} from "../localStorageService";
import PropTypes from "prop-types";

function UsersPageActions(props) {
    const {
        value,
        history,
        notYouFolCount,
        settings,
        userName,
        userAvatarLink
    } = props;

    const userInformation = getItemFromLocalStorage(USER_INFORMATION);

    return (
        <div className={s.ActionLine}>
            <button
                onClick={() => {
                    Script.openUserProfile(value, history)
                }}
                className={`button ${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
            >
                <AiOutlineEye/>
                Open profile
            </button>
            <button
                onClick={() => {
                    Script.Subscribe(value, toast, notYouFolCount)
                }}
                className={`button ${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
            >
                <AiOutlineUsergroupAdd/>
                Subscribe
            </button>
            <button
                onClick={() => {
                    Script.friendRequest({
                        receiverId: +value,
                        requestSendById: +userInformation?.id,
                        receiverName: userName,
                        requesterName: userInformation?.userName,
                        userAvatarLink
                    }, toast)
                }}
                className={`button ${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
            >
                <AiOutlineUserAdd/>
                Friend request
            </button>
        </div>
    )
}

UsersPageActions.propTypes = {
    value:PropTypes.string,
    history:PropTypes.object,
    notYouFolCount:PropTypes.number,
    settings:PropTypes.object,
    userName:PropTypes.string,
    userAvatarLink:PropTypes.string || PropTypes.object
};

export default UsersPageActions;