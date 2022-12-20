import {forwardRef, LegacyRef, useState} from "react";
import {createPortal} from "react-dom";
import ClearModalUser from "./clearModalUser";
import s from "./main-page.module.css"
import Script from "./script.js"
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

    const [name, setName] = useState(userName);
    const [userEmail, setEmail] = useState(email);
    const [password, setPassword] = useState("Your password");

    const {click} = props;

    return createPortal(
        <div className={s.UpdateModal + " Hide Muser"} ref={ref} onDoubleClick={() => click()}>
            <Paper elevation={0}>
                <CardContent>
                    <ClearModalUser
                        setName={setName}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        nm={name}
                        em={userEmail}
                        pas={password}
                        Script={Script}
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