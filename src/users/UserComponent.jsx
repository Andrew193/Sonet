import React from "react";
import s from "./users.module.css";
import postStyle from "../posts/posts.module.css"
import Script from "./script";
import {AiOutlineClockCircle, AiOutlineMail, AiOutlineSafetyCertificate, AiOutlineUser} from "react-icons/ai";
import DataHelper from "../helpers/dateHelper";
import UsersPageActions from "./UsersPageActions";
import {LazyLoadComponent, trackWindowScroll} from "react-lazy-load-image-component";
import {useHistory} from "react-router-dom";
import {useSettings} from "../hooks";
import PropTypes from "prop-types";
import Loader from "../Loader";
import LazyImage from "../posts/LazyImage";
import {getElementsThemeConfig, getPropertiesConfig} from "../utils";
import {alpha} from "@mui/material";

function UserComponent(props) {
    const {
        value,
        avatarUrl,
        searchId,
        id,
    } = props;

    const history = useHistory();
    const {settings} = useSettings();

    return (
        <div>
            <LazyLoadComponent placeholder={<Loader/>}>
                <div
                    className={s.Item + " itemsUsersPage"}
                    data-id={value[5]}
                    onClick={(e) => Script.openUser(e, history)}
                    style={settings?.list?.listItemStyles}
                >
                    {value[3] &&
                        <div className={postStyle.PostItemBar}>
                            <LazyImage
                                imgClass={postStyle.PostAvatar}
                                wrapperStyle={{
                                    ...getElementsThemeConfig(settings, getPropertiesConfig(true, null,
                                        false, null, null, alpha("#ffffff", 0.3), false))
                                }}
                                wrapperClassName={"post-images-lazy-cover"}
                                imageSrc={avatarUrl}
                            />
                        </div>
                    }
                    <div
                        style={{
                            borderLeft: '1px solid #ccc',
                            flex: "10 0 0",
                            padding: "10px"
                        }}
                    >
                        <h3>
                            <div
                                className={s.users_a}
                                onClick={() => {
                                    history.push(`/users/${value[0]}`)
                                }}>
                                <AiOutlineUser style={{color: value[5] === id ? "red" : ""}}/>
                                <span style={{color: value[5] === id ? "red" : ""}}
                                      className={"usersNamePageName"}>{value[0]}</span>
                            </div>
                            {value[2] && <AiOutlineSafetyCertificate/>}
                        </h3>
                        <span>
                                <AiOutlineMail size={"13px"}/>
                                <a href={`mailto:${value[1]}`}>{value[1]}</a>
                            </span>
                    </div>
                    <span className={s.CreatedDate + " d-flex-c-c"}>
                            <AiOutlineClockCircle/>{DataHelper.fromNow(value[4])}
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
            </LazyLoadComponent>
        </div>
    )
}

UserComponent.propTypes = {
    index: PropTypes.number,
    value: PropTypes.array,
    avatarUrl: PropTypes.string,
    searchId: PropTypes.string,
    id: PropTypes.number,
};

export default trackWindowScroll(UserComponent);