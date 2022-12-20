import React from "react";
import {useFormik} from "formik";
import AuthPageForm from "./AuthPageForm"
import {ToastContainer} from 'react-toastify';
import AuthHelper from "./authHelper";
import HeaderStyles from "../header/header.module.css";
import FastActions from "../fast-actions/fast-actions.module.css";
import FastMessages from "../fast-message/fast-message.module.css";
import FastMusic from "../fast-music/fast-music.module.css";
import {ReactNode, useEffect, useState} from "react";
import {useHistory} from "react-router";
import {notify} from "../App";
import {useSettings} from "../hooks";
import CommonHelper from "../helpers/common";
import {headerListLinks} from "../vars";

function ContainerAuth() {
    const [isRegisterUser, setIsRegisterUser] = useState<boolean>(true);
    const [redirect, setRedirect] = useState<boolean>(false)

    const history = useHistory();

    const {settings} = useSettings();

    const Formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values, {resetForm}) => {
            AuthHelper.AuthPageSubmitCover(values, resetForm, isRegisterUser, setRedirect, (message: ReactNode | string) => {
                const Msg = () => (
                    <div>{message}</div>
                )
                notify(<Msg/>);
            })
        }
    })

    useEffect(() => {
        if (redirect) {
            CommonHelper.redirect(history, null, headerListLinks.base)
        }
    }, [redirect])

    return (
        <>
            <style>{`
             .${HeaderStyles.HeadersLinksPaper} {
             height:0px!important;
             }
             .${FastActions.Container}, .${FastMessages.Container}, .${FastMusic.Container} {
             display: none!important;
             }
            `}</style>
            <AuthPageForm
                Formik={Formik}
                isRegisterUser={isRegisterUser}
                setIsRegisterUser={setIsRegisterUser}
                styleSettings={settings}
            />

            <ToastContainer
                toastStyle={{background: "black", borderRadius: "15px"}}
                hideProgressBar={true}
                autoClose={200000}
                position="top-right"
            />
        </>
    )
}

export default ContainerAuth;