import s from "./profile.module.css"
import {AiOutlineCalendar, AiOutlineMail, AiOutlineNumber, AiOutlineEye} from "react-icons/ai";
import Script from "./profileHelper"
import {useHistory} from "react-router";

function FlexColl(props) {
    const {
        userInfo,
        cr,
        up,
        myId,
        settings
    } = props;

    const history = useHistory();

    return (
        <div
            className={s.FlexColl}
            style={{
                color: settings?.configs?.color[settings?.color]
            }}
        >
            <div className={s.SecondLine}>
                <span className={s.Black}>
                    <b>{userInfo.userName}</b>
                </span>
                <span>
                    <AiOutlineMail
                        className={s.CommonIcon}
                        style={{
                            color: "black"
                        }}
                    />
                    {myId !== userInfo.id ?
                        <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
                        : <>{userInfo.email}</>}
                </span>
                <span>
                    <AiOutlineNumber
                        className={s.CommonIcon}
                        style={{
                            color: "black"
                        }}
                    />{userInfo.id}
                </span>
            </div>
            <div
                className={"wrap-link-line-v2"}
            >
                <AiOutlineCalendar
                    className={s.CommonIcon}
                    style={{
                        color: "black"
                    }}
                /> Joined {cr}
            </div>
            <div
                style={{margin: "10px 0px"}}
                className={"wrap-link-line-v2"}
            >
                <AiOutlineCalendar
                    className={s.CommonIcon}
                    style={{
                        color: "black"
                    }}
                /> Last update {cr === up ? "Never" : up}
            </div>
            <div className={s.LastLine}>
                <span onClick={() => {
                    Script.getMyFollowings(myId, history)
                }}>
                    <AiOutlineEye
                        className={s.CommonIcon}
                        style={{
                            color: "black"
                        }}
                    /> <b className={s.Black}>{userInfo.youFolCount}</b> Following
                </span>
                <span onClick={() => {
                    Script.getMyFollowers(myId, history)
                }}>
                    <AiOutlineEye
                        className={s.CommonIcon}
                        style={{
                            color: "black"
                        }}
                    /><b className={s.Black}>{userInfo.folCount}</b> Followers
                </span>
            </div>
        </div>
    )
}

export default FlexColl;