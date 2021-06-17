import s from "./style.module.css"
import { AiOutlineCalendar, AiOutlineMail, AiOutlineNumber, AiOutlineEye } from "react-icons/ai";
import Script from "./script"
import { useHistory } from "react-router";
function FlexColl(props) {
    const { userInfo, cr, up, myId } = props;
    const history = useHistory();
    return (
        <div className={s.FlexColl}>
            <div className={s.SecondLine}>
                <span className={s.Black}><b>{userInfo.createdBy}</b></span>
                <span>
                    <AiOutlineMail className={s.CommonIcon} />
                    {myId !== userInfo.id ?
                        <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
                        : <>{userInfo.email}</>}
                </span>
                <span><AiOutlineNumber className={s.CommonIcon} />{userInfo.id}</span></div>
            <div>
                <AiOutlineCalendar className={s.CommonIcon} /> Joined {cr}
            </div>
            <div style={{ margin: "10px 0px" }}>
                <AiOutlineCalendar className={s.CommonIcon} /> Last update {cr === up ? " nefer" : up}
            </div>
            <div className={s.LastLine}>
                <span onClick={() => Script.getMyFollowings(myId, history)}>
                    <AiOutlineEye className={s.CommonIcon} /> <b className={s.Black}>{userInfo.youFolCount}</b> Following
                </span>
                <span>
                    <AiOutlineEye className={s.CommonIcon} /><b className={s.Black}>{userInfo.folCount}</b> Followers
                </span>
            </div>
        </div>
    )
}
export default FlexColl;