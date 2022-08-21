import {useHistory} from "react-router-dom";
import s from "./users.module.css"
import {useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {forceCheck} from 'react-lazyload';
import UserComponent from "./UserComponent";

forceCheck();

function ClearUsers(props) {
    const {
        isSearchBarOpened,
        setOpen,
        settings,
        searchId
    } = props;

    const history = useHistory();
    const [parsedUsers, setParsedUsers] = useState([]);
    const currentWidth = useMemo(() => document?.body.offsetWidth, [document?.body.offsetWidth]);

    const {id} = JSON.parse(localStorage.getItem("userInfo"));

    const {t} = useTranslation();

    useEffect(() => {
        setOpen(() => false);

        setParsedUsers(() => props?.toMake?.users?.map((value, index) => {
            let avatarUrl = null;

            try {
                avatarUrl = JSON.parse(value[3])?.webContentLink
            } catch (error) {
                avatarUrl = value[3];
            }

            return <UserComponent
                key={index}
                index={index}
                value={value}
                settings={settings}
                avatarUrl={avatarUrl}
                searchId={searchId}
                id={id}
                t={t}
            />
        }))
    }, [history, id, props?.toMake?.users, setOpen])

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

export default ClearUsers;