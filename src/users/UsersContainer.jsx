import {useEffect, useState} from "react";
import Script from "./script.js"
import Skeleton from 'react-loading-skeleton';
import s from "./users.module.css"
import {withRouter} from "react-router-dom";
import ClearUsersContainer from './UsersPageContent';
import {getSettings} from "../db";
import {hexToRgb} from "@mui/material";

function UsersContainer(props) {
    const [usersConfig, setUsers] = useState({users: []});
    const [open, setOpen] = useState(false);
    const [settings, setSettings] = useState({});

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

    useEffect(() => {
        async function getData() {
            const response = await getSettings();

            setSettings(response[0])
        }

        getData();
    }, [])

    return (
        <div
            className={s.Container}
            style={{
                fontSize: settings?.configs?.size[settings?.fontSize],
                borderRight: `1px solid ${hexToRgb(settings?.configs?.color[settings?.color] || "rgb(231 231 240)")}`,
            }}
        >
            <style>
                {`
                .${s.Container} {
                      background: ${settings?.configs?.background[settings?.background]};
                }
                `}
            </style>
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