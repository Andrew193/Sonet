import {useEffect, useState} from "react";
import UsersHelper from "./usersHelper";
import Skeleton from 'react-loading-skeleton';
import UserStyles from "./users.module.css"
import {withRouter} from "react-router-dom";
import ClearUsersContainer from './UsersPageContent';
import React from "react";
import {useSettings} from "../hooks";
import {getEmptyElementsThemeConfig} from "../utils";
import PropTypes from "prop-types";
import {withAsideBar} from "../hoc/withAsideBar";

function UsersContainer(props) {
    const [usersConfig, setUsers] = useState({users: []});
    const {settings} = useSettings();

    useEffect(() => {
        const searchedUserId = props?.match?.params?.id
        if (searchedUserId && typeof (+searchedUserId) === "number") {
            UsersHelper.getSelectedUser(+searchedUserId)
                .then((usersF) => {
                    usersF.users[0].push(true)
                    setUsers(usersF)
                })
                .catch((error) => console.log(error))
        } else {
            UsersHelper.getUsers().then((usersF) => setUsers(usersF)).catch((error) => console.log(error))
        }
    }, [props?.match?.params?.id])

    return (
        <div
            className={UserStyles.Container}
            style={{...getEmptyElementsThemeConfig(settings)}}
        >
            {usersConfig.users?.length ? <ClearUsersContainer
                users={usersConfig}
                settings={settings}
                id={props?.match?.params?.id}
            /> : <Skeleton height={"50px"} count={10}/>}
        </div>
    )
}

UsersContainer.propTypes = {
    match: PropTypes.object,
};

export default withAsideBar(withRouter(UsersContainer));