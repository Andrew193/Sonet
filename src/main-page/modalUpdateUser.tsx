import {forwardRef, Ref, useState} from "react";
import {createPortal} from "react-dom";
import {useHistory} from "react-router";
import ClearModalUser from "./clearModalUser";
import s from "./main-page.module.css"
import Script from "./script.js"
import {CardContent, Paper} from "@mui/material";
import {getItemFromLocalStorage} from "../localStorageService";

type ModalUserInterface = {
    click: Function
}

const ModalUser = forwardRef<HTMLDivElement, ModalUserInterface>((props, ref) => {
    const {
        userName,
        email,
        id
    } = getItemFromLocalStorage("userInfo");

    const [name, setName] = useState(userName);
    const [userEmail, setEmail] = useState(email);
    const [password, setPassword] = useState("Your password");

    const history = useHistory();

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
                        history={history}
                        click={click}
                        userId={id}
                    />
                </CardContent>
            </Paper>
        </div>, document.body
    )
})

export default ModalUser;