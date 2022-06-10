import { useHistory, withRouter } from "react-router";
import s from "./profile.module.css";
import Script from "./script.js"
import ClearProfile from "./clear";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";


function Profile(props) {
    const userId = props.match.params.id;

    const history = useHistory();
    const [userInfo, setUserInfo] = useState(false);

    useEffect(() => {
        !userId ? setUserInfo(JSON.parse(localStorage.getItem("userInfo")))
            : Script.getUser(userId)
                .then((response) => setUserInfo(response?.data?.user))
                .catch((error) => console.log(error))
    }, [userId]);

    return (
        <div className={s.Container}>
            {userInfo ?
                <ClearProfile s={s} history={history} userInfo={userInfo} />
                :
                <>
                    <Skeleton height={"50px"} />
                    <Skeleton height={"250px"} />
                    <Skeleton height={"50px"} count={5} />
                </>
            }
        </div>
    )
}
export default withRouter(Profile);