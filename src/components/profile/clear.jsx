import {Link} from "react-router-dom";
import Ver from "./ver.jsx";
import FirstLine from "./firstLine.jsx";
import DateHelper from "../../helpers/dateHelper.js";
import FlexColl from "./FlexColl.jsx";
import Script from "./script.js"
import postServ from "../posts/script.js"
import {useEffect, useRef, useState} from "react";
import PageHeader from "../common/navigationLine/NavigationLine.jsx";
import UserHelper from "../../helpers/userHelper";

function ClearProfile(props) {
    const {s, history, userInfo} = props;
    const myId = JSON.parse(localStorage.getItem("userInfo")).id
    const [count, setCount] = useState(0)
    const cr = DateHelper.fromNow(userInfo.createdAt),
        up = DateHelper.fromNow(userInfo.updatedAt);

    let image = useRef();

    useEffect(() => {
        Script.getPCount(userInfo.id, setCount);
    }, [userInfo.id]);

    return (<>
            <form>
                <input
                    ref={(el) => image = el}
                    onChange={() => UserHelper.updateImage(image, "setBack")}
                    type="file"
                    style={{display: "none"}}
                />
            </form>

            <PageHeader historyPath={"/"}>
                <>
                    <div>
                        <Link to={{pathname: "/profile"}}>{userInfo.userName}</Link>
                        <br/>
                        <span className={s.PostCount}
                              onClick={() => postServ.getMy(history, userInfo.id)}
                        >{0 || count} Posts
                        </span>
                    </div>
                    <Ver userInfo={userInfo} myId={myId}/>
                </>
            </PageHeader>
            <div
                className={s.Back}
                onClick={() => (myId === userInfo.id) && UserHelper.CallImageInput(image)}
                style={userInfo.back && {backgroundImage: `url(${userInfo.back})`}}
            />
            <FirstLine
                imgUrl={userInfo.avatar}
                myId={myId}
                id={userInfo.id}
            />
            <div
                className={"Separator"}
                onClick={(e) => e.target.nextElementSibling.classList.toggle("Hide")}
            />
            <FlexColl
                myId={myId}
                up={up}
                cr={cr}
                userInfo={userInfo}
            />
        </>
    )
}

export default ClearProfile;