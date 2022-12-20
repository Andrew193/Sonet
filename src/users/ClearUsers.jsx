import {useHistory} from "react-router-dom";
import s from "./users.module.css"
import React from "react";
import {useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import UserComponent from "./UserComponent";
import {USER_INFORMATION} from "../vars";
import {getItemFromLocalStorage} from "../localStorageService";
import PropTypes from "prop-types";
import {trackWindowScroll, LazyLoadComponent} from "react-lazy-load-image-component";
import Loader from "../Loader";

function ClearUsers(props) {
    const {
        isSearchBarOpened,
        setOpen,
        settings,
        searchId,
        toMake
    } = props;

    const history = useHistory();
    const [parsedUsers, setParsedUsers] = useState([]);
    const currentWidth = useMemo(() => document?.body.offsetWidth, [document?.body.offsetWidth]);

    const id = getItemFromLocalStorage(USER_INFORMATION, "id");

    const {t} = useTranslation();

    useEffect(() => {
        setOpen(() => false);

        setParsedUsers(() => toMake?.users?.map((value, index) => {
            let avatarUrl = null;

            try {
                avatarUrl = JSON.parse(value[3])?.webContentLink
            } catch (error) {
                avatarUrl = value[3];
            }

            return (
                <LazyLoadComponent
                    key={index + "_lazy"}
                    placeholder={<Loader/>}
                >
                    <UserComponent
                        key={index}
                        index={index}
                        value={value}
                        avatarUrl={avatarUrl}
                        searchId={searchId}
                        id={id}
                        t={t}
                    />
                </LazyLoadComponent>
            )
        }))
    }, [history, id, toMake?.users, setOpen])

    return (
        <div
            className={`${
                currentWidth > 768
                    ? isSearchBarOpened
                        ? 'col-xs-8 col-sm-8'
                        : 'col-xs-12 col-sm-12'
                    : 'col-xs-12 col-sm-12'
            } users-box` + s.UsersCont}
            style={{
                height: '700px',
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
    setOpen: PropTypes.func,
    settings: PropTypes.object,
    searchId: PropTypes.number,
    toMake: PropTypes.object
};

export default trackWindowScroll(ClearUsers);