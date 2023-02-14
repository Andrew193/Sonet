import UsersStyles from "./users.module.css"
import UsersHelper from "./usersHelper"
import React from "react";
import {useRef} from "react"
import {useHistory} from "react-router-dom"
import Loader from "../Loader";
import {useTranslation} from "react-i18next";

function FindUserLine() {
    let userID = useRef()
    const history = useHistory();
    const {t} = useTranslation();

    return (
        <div
            className={`${UsersStyles.FindUserLine} col-xs-4 col-sm-4`}
            data-testid={"FindLine"}
            style={{padding: 'unset'}}
        >
            <div data-testid={"inner"}>
                <input
                    type={"number"}
                    ref={(el) => userID = el}
                    placeholder={t("Input user ID")}/>
                <span
                    id={'mainPostBtn'}
                    onClick={() => UsersHelper.openUser(null, history, userID.value)}
                >{t("Find by ID")}
                </span>
            </div>
            <Loader/>
        </div>
    )
}

export default FindUserLine;