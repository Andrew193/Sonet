import {useEffect, useState} from "react";
import Script from "./script.js"
import Skeleton from 'react-loading-skeleton';
import s from "./users.module.css"
import {withRouter} from "react-router-dom";
import ClearUsersContainer from './UsersPageContent';

function UsersContainer(props) {
    const [users, setUsers] = useState(false);
    const [open, setOpen] = useState(false);

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
        <div className={s.Container}>
            {users
                ? <ClearUsersContainer
                    users={users}
                    setOpen={setOpen}
                    open={open}
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