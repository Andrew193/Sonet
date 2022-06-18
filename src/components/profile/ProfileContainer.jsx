import {useHistory, withRouter} from "react-router";
import s from "./profile.module.css";
import Script from "./script.js"
import ClearProfile from "./ClearProfile";
import {useEffect, useState} from "react";
import Skeleton from "react-loading-skeleton";
import {getSettings} from "../../db";
import {hexToRgb} from "@mui/material";


function Profile(props) {
    const userId = props.match.params.id;

    const history = useHistory();
    const [userInfo, setUserInfo] = useState(false);

    useEffect(() => {
        if (!userId) {
            setUserInfo(JSON.parse(localStorage.getItem("userInfo")))
        } else {
            Script.getUser(userId)
                .then((response) => setUserInfo(response?.data?.user))
                .catch((error) => console.log(error))
        }
    }, [userId]);

    const [settings, setSettings] = useState({});

    useEffect(() => {
        async function getData() {
            const response = await getSettings();

            setSettings(response[0])
        }

        getData();
    }, [])

    return (
        <div
            className={s.Container}
            style={{
                borderLeft: `1px solid ${hexToRgb(settings?.configs?.color[settings?.color] || "rgb(231 231 240)")}`,
                borderRight: `1px solid ${hexToRgb(settings?.configs?.color[settings?.color] || "rgb(231 231 240)")}`,
                background: hexToRgb(settings?.configs?.background[settings?.background] || "rgb(231 231 240)")
            }}
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