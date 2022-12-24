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

function UsersContainer(props) {
    const [usersConfig, setUsers] = useState({users: []});
    const [, setOpen] = useState(false);
    const {settings} = useSettings();

    useEffect(() => {
        const id = props?.match?.params?.id;

        if (id && typeof (+id) === "number") {
            setOpen(() => true)
            UsersHelper.getSelectedUser(+id)
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
            {usersConfig.users?.length > 0
                ? <ClearUsersContainer
                    users={usersConfig}
                    setOpen={setOpen}
                    settings={settings}
                    id={props?.match?.params?.id}
                />
                : <Skeleton
                    height={"50px"}
                    count={10}
                />
            }
        </div>
    )
}

UsersContainer.propTypes = {
    match: PropTypes.object,
};

export default withRouter(UsersContainer);