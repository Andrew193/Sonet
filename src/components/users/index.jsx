import { useEffect, useState } from "react";
import ClearUsers from "./clear.jsx";
import Script from "./script.js"
import Skeleton from 'react-loading-skeleton';
import s from "./style.module.css"
import { Link, withRouter } from "react-router-dom";
import FindUserLine from "./findLine.jsx";
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
            Script.getUsers()
                .then((usersF) => setUsers(usersF))
                .catch((error) => { error && console.log(error); })
        }
    }, [props.match.params.id])
    return (
        <div className={s.Container}>
            <div className={"basicPageHead"}><Link to={{ pathname: "/users" }}>Users</Link></div>
            <div className={"Separator"} onClick={(e) => e.target.nextElementSibling.classList.toggle("Hide")}></div>
            {users ? <><ClearUsers toMake={users} />   <FindUserLine /></> : <Skeleton height={"60px"} count={10}/>}
        </div>
    )
}

export default withRouter(UsersContainer);