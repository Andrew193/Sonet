import {useEffect, useState} from "react";
import Script from "./script.js"
import Skeleton from 'react-loading-skeleton';
import s from "./users.module.css"
import {withRouter} from "react-router-dom";
import ClearUsersContainer from './UsersPageContent';
import {hexToRgb} from "@mui/material";
import {useSettings} from "../hooks";
import {getEmptyElementsThemeConfig} from "../utils";

function UsersContainer(props) {
    const [usersConfig, setUsers] = useState({users: []});
    const [open, setOpen] = useState(false);
    const {settings} = useSettings();

    useEffect(() => {
        const id = props?.match?.params?.id;

        if (id && typeof (+id) === "number") {
            setOpen(() => true)
            Script.getSelectedUser(+id)
                .then((usersF) => {
                    usersF.users[0].push(true)
                    setUsers(usersF)
                })
                .catch((error) => {
                    error && console.log(error);
                })
        } else {
            Script.getUsers().then((usersF) => setUsers(usersF)).catch((error) => {
                error && console.log(error);
            })
        }
    }, [props?.match?.params?.id])

    return (
        <div
            className={s.Container}
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

export default withRouter(UsersContainer);