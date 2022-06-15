import {AiOutlineSafetyCertificate} from "react-icons/ai";
import {Link, useHistory} from "react-router-dom";
import DataHelper from "../helpers/dateHelper.js"
import s from "./users.module.css"
import {AiOutlineMail, AiOutlineUser, AiOutlineClockCircle} from "react-icons/ai";
import Script from "./script.js"
import UsersPageActions from "./UsersPageActions";
import {useMemo} from "react";

function ClearUsers(props) {
    const {
        isSearchBarOpened,
        setOpen
    } = props;

    const history = useHistory();
    const currentWidth = useMemo(() => document?.body.offsetWidth, [document?.body.offsetWidth]);

    const {id} = JSON.parse(localStorage.getItem("userInfo"));

    const usersToMake = useMemo(() => {
        setOpen(() => false);

        return props?.toMake?.users?.map((value, index) => {
            let avatarUrl = null;

            try {
                avatarUrl = JSON.parse(value[3])?.webContentLink
            } catch (error) {
                avatarUrl = value[3];
            }

            return <>
                <div
                    key={"df" + index}
                    className={s.Item}
                    data-id={value[5]}
                    onClick={(e) => {
                        Script.openUser(e, history)
                    }}
                >
                    {value[3] && <img src={avatarUrl} alt={"Avatar"}/>}
                    <div>
                        <h3>
                            <div
                                className={s.users_a}
                                onClick={() => {
                                    history.push(`/users/${value[0]}`)
                                }}>
                                <AiOutlineUser/> {value[0]}
                                <span
                                    className={s.ThisIsYouLabel}
                                >{value[5] === id ? "This is you" : ""}</span>
                            </div>
                            {value[2] && <AiOutlineSafetyCertificate/>}
                        </h3>
                        <span>
                                <AiOutlineMail size={"13px"}/>
                                <a href={`mailto:${value[1]}`}>{value[1]}</a>
                            </span>
                    </div>
                    <span>
                            <AiOutlineClockCircle/> Joined us {DataHelper.fromNow(value[4])}
                        </span>
                </div>
                {value[7] && <UsersPageActions notYouFolCount={value[6]} value={value[5]} history={history}/>}
            </>
        })
    }, [history, id, props.toMake.users])

    return (
        <div
            className={`${
                currentWidth > 768
                    ? isSearchBarOpened
                        ? 'col-xs-8 col-sm-8'
                        : 'col-xs-12 col-sm-12'
                    : 'col-xs-12 col-sm-12'
            } users-box` + s.UsersCont}
            style={{height: '700px', padding: 'unset'}}
        >
            {usersToMake}
        </div>
    )
}

export default ClearUsers;