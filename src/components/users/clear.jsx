import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import DataHelper from "../../helpers/dateHelper.js"
import s from "./style.module.css"
import { AiOutlineMail } from "react-icons/ai";
import Script from "./script.js"
import ActionLine from "./actionLine.jsx";
function ClearUsers(props) {
    console.log(props);
    const history = useHistory();
    const { id, youFolCount } = JSON.parse(localStorage.getItem("userInfo"))
    return (
        <div className={s.UsersCont}>
            {props.toMake.users.map((value, index) => {
                if (value[5] !== id) {
                    return <><div key={"df" + index} className={s.Item} data-id={value[5]} onClick={(e) => Script.openUser(e, history)}>
                        {value[3] && <img src={value[3]} alt={"Avatar"}></img>}
                        <div>
                            <h3>
                                <Link to={{ pathname: `/users/${value[0]}` }}>{value[0]}</Link>
                                {value[2] && <AiOutlineSafetyCertificate />}
                            </h3>
                            <span><AiOutlineMail size={"13px"} /><a href={`mailto:${value[1]}`}>{value[1]}</a></span>
                        </div>
                        <span>Joined us {DataHelper.fromNow(value[4])}</span>
                    </div>
                        {value[7] && <ActionLine notYouFolCount={value[6]} youFolCount={youFolCount} myId={id} value={value[5]} history={history}/>}
                    </>
                } return null
            })}
        </div>
    )
}
export default ClearUsers;