import UsersStyles from "./users.module.css"
import React, {useRef} from "react";
import {useEffect, useMemo, useState} from "react";
import UserComponent from "./UserComponent";
import {USER_INFORMATION} from "../vars";
import {getItemFromLocalStorage} from "../localStorageService";
import PropTypes from "prop-types";
import {trackWindowScroll, LazyLoadComponent} from "react-lazy-load-image-component";
import Loader from "../Loader";
import {getImageLinkFromStaticObject} from "../utils";

function ClearUsers(props) {
    const {
        isSearchBarOpened,
        settings,
        searchId,
        toMake
    } = props;

    const [parsedUsers, setParsedUsers] = useState([]);
    const currentWidth = useMemo(() => document?.body.offsetWidth, [document?.body.offsetWidth]);

    const idRef = useRef(getItemFromLocalStorage(USER_INFORMATION, "id"))

    useEffect(() => {
        setParsedUsers(() => toMake?.users?.map((value, index) =>
            <LazyLoadComponent key={index + "_lazy"} placeholder={<Loader/>}>
                <UserComponent
                    key={index}
                    index={index}
                    value={value}
                    avatarUrl={getImageLinkFromStaticObject(value[3])}
                    searchId={searchId}
                    id={idRef.current}
                />
            </LazyLoadComponent>
        ))
    }, [toMake?.users])

    return (
        <div
            className={`${
                currentWidth > 768
                    ? isSearchBarOpened
                        ? 'col-xs-8 col-sm-8'
                        : 'col-xs-12 col-sm-12'
                    : 'col-xs-12 col-sm-12'
            } users-box` + UsersStyles.UsersCont}
            style={{
                minHeight: '700px',
                padding: 'unset',
                background: parsedUsers?.length === 1 ? settings?.configs?.background[settings?.background] : ""
            }}
        >
            {parsedUsers}
        </div>
    )
}

ClearUsers.propTypes = {
    isSearchBarOpened: PropTypes.bool,
    settings: PropTypes.object,
    searchId: PropTypes.string,
    toMake: PropTypes.object
};

export default trackWindowScroll(ClearUsers);