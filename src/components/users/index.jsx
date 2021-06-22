import { useEffect, useState } from "react";
import Script from "./script.js"
import Skeleton from 'react-loading-skeleton';
import s from "./style.module.css"
import { withRouter } from "react-router-dom";
import ClearUsersContainer from "./clearUsersContainer.jsx";
function UsersContainer(props) {
    const [users, setUsers] = useState(false);
    useEffect(() => {
        const id = props.match.params.id
        if (id && typeof (+id) === "number") {
            Script.getSelectedUser(+id)
                .then((usersF) => {
                    usersF.users[0].push(true)
                    setUsers(usersF)
                })
                .catch((error) => { error && console.log(error); })
        } else {
            Script.getUsers().then((usersF) => setUsers(usersF)).catch((error) => { error && console.log(error); })
        }
    }, [props.match.params.id])
    return (
        <div className={s.Container}>
            {users ? <ClearUsersContainer users={users} /> : <Skeleton height={"50px"} count={10} />}
        </div>
    )
}

export default withRouter(UsersContainer);