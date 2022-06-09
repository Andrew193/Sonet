import {AiOutlineSafetyCertificate} from "react-icons/ai";
import {Link, useHistory} from "react-router-dom";
import DataHelper from "../../helpers/dateHelper.js"
import s from "./users.module.css"
import {AiOutlineMail, AiOutlineUser, AiOutlineClockCircle} from "react-icons/ai";
import Script from "./script.js"
import ActionLine from "./actionLine.jsx";
import {useMemo} from "react";

function ClearUsers(props) {
    const history = useHistory();
    const {id} = JSON.parse(localStorage.getItem("userInfo"));

    const usersToMake = useMemo(() =>
        props?.toMake?.users?.map((value, index) => {
            if (value[5] !== id) {
                return <>
                    <div
                        key={"df" + index}
                        className={s.Item}
                        data-id={value[5]}
                        onClick={(e) => {
                            Script.openUser(e, history)
                        }}
                    >
                        {value[3] && <img src={value[3]} alt={"Avatar"}/>}
                        <div>
                            <h3>
                                <Link to={{pathname: `/users/${value[0]}`}}>
                                    <AiOutlineUser/> {value[0]}
                                </Link>
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
                    {value[7] && <ActionLine notYouFolCount={value[6]} value={value[5]} history={history}/>}
                </>
            }
            return null
        }), [history, id, props.toMake.users])

    return (
        <div
            className={"col-xs-8 col-sm-8 users-box " + s.UsersCont}
            style={{height: '700px', padding: 'unset'}}
        >
            {usersToMake}
        </div>
    )
}

export default ClearUsers;