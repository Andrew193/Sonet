import {forwardRef, LegacyRef, useState} from "react";
import {createPortal} from "react-dom";
import ClearModalUser from "./clearModalUser";
import MainPageStyle from "./main-page.module.css"
import MainPageHelper from "./mainPageHelper"
import {CardContent, Paper} from "@mui/material";
import {getItemFromLocalStorage} from "../localStorageService";
import React from "react";
import {USER_INFORMATION} from "../vars";

type ModalUserInterface = {
    click: () => void
}

const ModalUserCover = (props: ModalUserInterface, ref: LegacyRef<HTMLDivElement>) => {
    const {
        userName,
        email,
        id
    } = getItemFromLocalStorage(USER_INFORMATION);

    const [userInfo, setUserInfo] = useState({
        userName: userName,
        userEmail: email,
        password: "Your password"
    });

    const {click} = props;

    return createPortal(
        <div className={MainPageStyle.UpdateModal + " Hide Muser"} ref={ref} onDoubleClick={() => click()}>
            <Paper elevation={0}>
                <CardContent>
                    <ClearModalUser
                        setUserInfo={setUserInfo}
                        {...userInfo}
                        ApiHelper={MainPageHelper}
                        click={click}
                        userId={id}
                    />
                </CardContent>
            </Paper>
        </div>, document.body
    )
}

const ModalUser = forwardRef<HTMLDivElement, ModalUserInterface>(ModalUserCover)

export default ModalUser;