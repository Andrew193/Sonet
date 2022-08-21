import LazyLoad from "react-lazyload";
import s from "./users.module.css";
import Script from "./script";
import {Avatar} from "@mui/material";
import {AiOutlineClockCircle, AiOutlineMail, AiOutlineSafetyCertificate, AiOutlineUser} from "react-icons/ai";
import DataHelper from "../helpers/dateHelper";
import UsersPageActions from "./UsersPageActions";
import {useHistory} from "react-router-dom";


function UserComponent(props) {
    const {
        index,
        value,
        settings,
        avatarUrl,
        searchId,
        id,
        t
    } = props;

    const history = useHistory();

    return(
        <div>
            <LazyLoad key={"as" + index}>
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
            </LazyLoad>
        </div>
    )
}

export default UserComponent;