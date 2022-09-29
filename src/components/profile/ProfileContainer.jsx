import {useHistory, withRouter} from "react-router";
import s from "./profile.module.css";
import Script from "./profileHelper"
import ClearProfile from "./ClearProfile";
import {useEffect, useState} from "react";
import Skeleton from "react-loading-skeleton";
import {getEmptyElementsThemeConfig} from "../../utils";
import {useSettings} from "../../hooks";
import {getItemFromLocalStorage} from "../../localStorageService";

function Profile(props) {
    const userId = props.match.params.id;
    const history = useHistory();
    const [userInfo, setUserInfo] = useState(false);

    useEffect(() => {
        if (!userId) {
            setUserInfo(getItemFromLocalStorage("userInfo"))
        } else {
            Script.getUser(userId)
                .then((response) => setUserInfo(response?.data?.user))
                .catch((error) => console.log(error))
        }
    }, [userId]);

    const {settings} = useSettings();

    return (
        <div
            className={s.Container}
            style={{...getEmptyElementsThemeConfig(settings)}}
        >
            {userInfo ?
                <ClearProfile
                    s={s}
                    history={history}
                    userInfo={userInfo}
                    settings={settings}
                />
                :
                <>
                    <Skeleton height={"50px"}/>
                    <Skeleton height={"250px"}/>
                    <Skeleton height={"50px"} count={5}/>
                </>
            }
        </div>
    )
}

export default withRouter(Profile);