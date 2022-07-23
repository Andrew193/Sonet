import {AiOutlineSafetyCertificate} from "react-icons/ai";
import {useHistory} from "react-router-dom";
import DataHelper from "../helpers/dateHelper.js"
import s from "./users.module.css"
import {AiOutlineMail, AiOutlineUser, AiOutlineClockCircle} from "react-icons/ai";
import Script from "./script.js"
import UsersPageActions from "./UsersPageActions";
import {useMemo} from "react";
import {Avatar} from "@mui/material";
import {useTranslation} from "react-i18next";

function ClearUsers(props) {
    const {
        isSearchBarOpened,
        setOpen,
        settings,
        searchId
    } = props;

    const history = useHistory();
    const currentWidth = useMemo(() => document?.body.offsetWidth, [document?.body.offsetWidth]);

    const {id} = JSON.parse(localStorage.getItem("userInfo"));

    const {t} = useTranslation();

    const usersToMake = useMemo(() => {
        setOpen(() => false);

        return props?.toMake?.users?.map((value, index) => {
            let avatarUrl = null;

            try {
                avatarUrl = JSON.parse(value[3])?.webContentLink
            } catch (error) {
                avatarUrl = value[3];
            }

            return <>
                <div
                    key={"df" + index}
                    className={s.Item + " itemsUsersPage"}
                    data-id={value[5]}
                    onClick={(e) => {
                        Script.openUser(e, history)
                    }}
                    style={settings?.list?.listItemStyles}
                >
                    {value[3] && <Avatar
                        src={avatarUrl}
                        style={{
                            height: '100%',
                            width: '75px',
                            marginRight: '15px',
                            borderRadius: '5px',
                            marginLeft: '15px'
                        }}
                        alt={"Avatar"}
                    />
                    }
                    <div>
                        <h3>
                            <div
                                className={s.users_a}
                                onClick={() => {
                                    history.push(`/users/${value[0]}`)
                                }}>
                                <AiOutlineUser/> <span className={"usersNamePageName"}>{value[0]}</span>
                                <span
                                    className={s.ThisIsYouLabel}
                                >{value[5] === id ? t("This is you") : ""}</span>
                            </div>
                            {value[2] && <AiOutlineSafetyCertificate/>}
                        </h3>
                        <span>
                                <AiOutlineMail size={"13px"}/>
                                <a href={`mailto:${value[1]}`}>{value[1]}</a>
                            </span>
                    </div>
                    <span
                        className={s.CreatedDate}
                    >
                        <AiOutlineClockCircle/><span className={"fromNow"}>{DataHelper.fromNow(value[4])}</span>
                        </span>
                </div>
                {searchId && <UsersPageActions
                    notYouFolCount={value[6]}
                    value={value[5]}
                    history={history}
                    settings={settings}
                    userName={value[0]}
                    userAvatarLink={value[3]}
                />}
            </>
        })
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
                background: usersToMake?.length === 1 ? settings?.configs?.background[settings?.background] : ""
            }}
        >
            {usersToMake}
        </div>
    )
}

export default ClearUsers;