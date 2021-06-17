import { Link } from "react-router-dom";
import Ver from "./ver.jsx";
import FirstLine from "./firstLine.jsx";
import DateHelper from "../../helpers/dateHelper.js";
import FlexColl from "./FlexColl.jsx";
import Script from "./script.js"
import postServ from "../posts/script.js"
import { useEffect, useState } from "react";
import PageHeader from "../common/header/index.jsx";
function ClearProfile(props) {
    const { s, history, userInfo } = props;
    const myId = JSON.parse(localStorage.getItem("userInfo")).id
    const [count, setCount] = useState(0)
    const cr = DateHelper.fromNow(userInfo.createdAt),
        up = DateHelper.fromNow(userInfo.updatedAt);
    useEffect(() => {
        Script.getPCount(userInfo.id, setCount);
    }, [userInfo.id])
    return (<>
        <PageHeader historyPath={"/"}><>
            <div>
                <Link to={{ pathname: "/profile" }}>{userInfo.userName}</Link><br />
                <span className={s.PostCount} onClick={() => postServ.getMy(history, userInfo.id)}>{0 || count} Posts</span>
            </div>
            <Ver userInfo={userInfo} myId={myId} />
        </></PageHeader>
        <div className={s.Back}></div>
        {myId === userInfo.id && <FirstLine />}
        <div className={"Separator"} onClick={(e) => e.target.nextElementSibling.classList.toggle("Hide")}></div>
        <FlexColl myId={myId} up={up} cr={cr} userInfo={userInfo} />
    </>
    )
}

export default ClearProfile;