import React from "react";
import {useHistory, withRouter} from "react-router";
import ProfileStyles from "./profile.module.css";
import ProfileHelper from "./profileHelper"
import ClearProfile from "./ClearProfile";
import {useEffect, useState} from "react";
import Skeleton from "react-loading-skeleton";
import {getEmptyElementsThemeConfig} from "../../utils";
import {useSettings} from "../../hooks";
import {getItemFromLocalStorage} from "../../localStorageService";
import {USER_INFORMATION} from "../../vars";
import PropTypes from "prop-types";
import {withAsideBar} from "../../hoc/withAsideBar";

function Profile(props) {
    const userId = props.match.params.id;
    const history = useHistory();
    const [userInfo, setUserInfo] = useState(false);

    useEffect(() => {
        if (!userId) {
            setUserInfo(getItemFromLocalStorage(USER_INFORMATION))
        } else {
            ProfileHelper.getUser(userId)
                .then((response) => setUserInfo(response?.data?.user))
                .catch((error) => console.log(error))
        }
    }, [userId]);

    const {settings} = useSettings();

    return (
        <div
            className={ProfileStyles.Container}
            style={{...getEmptyElementsThemeConfig(settings)}}
        >
            {userInfo ?
                <ClearProfile
                    styles={ProfileStyles}
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

Profile.propTypes = {
    match: PropTypes.object,
};

export default withAsideBar(withRouter(Profile));