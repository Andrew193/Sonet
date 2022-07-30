import s from "./auth.module.css";
import {alpha, hexToRgb, Typography} from "@mui/material";
import {hexToRgb as muiHexToRgb} from "@mui/system/colorManipulator";
import {useState} from "react";
import {default as axios} from "axios";
import {API} from "../vars";
import {createErrorsForApiCall} from "../utils";

function Auth(props) {
    const {
        Formik,
        setIsRegisterUser,
        isRegisterUser,
        styleSettings
    } = props;

    const [recreatePasswordMode, setRecreatePasswordMode] = useState(false);

    return (
        <div
            className={s.Container}
            testId="Auth"
            style={{
                color: styleSettings?.configs?.color[styleSettings?.color],
                fontSize: styleSettings?.configs?.size[styleSettings?.fontSize],
                background: styleSettings?.configs?.background[styleSettings?.background]
            }}
        >
            <style>
                {`
                    #btnEnter {
                    ${recreatePasswordMode ? "top: 30%" : ""};
                    ${recreatePasswordMode ? "width: 50px" : ""};
                    ${recreatePasswordMode ? "height: 50px" : ""};
                    color: ${styleSettings?.configs?.color[styleSettings?.color]} !important;
                    border: 6px solid ${muiHexToRgb(styleSettings?.configs?.background[styleSettings?.background] || "rgb(231 231 240)")}  !important;
                    }
                    
                    #btnEnter:hover {
                     box-shadow: -1px -1px 29px 0px ${alpha(muiHexToRgb(styleSettings?.configs?.color[styleSettings?.color] || "rgb(231 231 240)"), 0.5)};
                     text-shadow: 0px 0px 10px ${styleSettings?.configs?.color[styleSettings?.color] || "#0a00ce"} !important;
                    }
                    
                    #modeLinks:hover {
                    text-shadow: 0px 0px 10px ${styleSettings?.configs?.color[styleSettings?.color] || "#0a00ce"};
                    color: ${styleSettings?.configs?.color[styleSettings?.color] || "#2525ac"};
                    }
                    `}
            </style>
            {
                !recreatePasswordMode
                    ? <>
                        <form
                            onSubmit={Formik.handleSubmit}
                        >
                            <article>
                                <h2
                                    className={isRegisterUser && s.Active}
                                    onClick={() => setIsRegisterUser(true)}
                                    id={"modeLinks"}
                                >Log up</h2>
                                <h2
                                    id={"modeLinks"}
                                    className={!isRegisterUser && s.Active}
                                    onClick={() => setIsRegisterUser(false)}
                                >Log in</h2>
                            </article>

                            <div>
                                <input
                                    type="email"
                                    id="email"
                                    {...Formik.getFieldProps("email")}
                                />
                                <span
                                    className={s.Tip}
                                >Email</span>
                            </div>

                            {Formik.touched.email && Formik.errors.email &&
                                <span className={s.Error + " " + s.f1}>{Formik.errors.email}</span>}

                            <div>
                                <input
                                    type="password"
                                    id="password"
                                    {...Formik.getFieldProps("password")}
                                />
                                <span
                                    className={s.Tip}
                                >Password</span>
                            </div>

                            {Formik.touched.password && Formik.errors.password &&
                                <span className={s.Error + " " + s.f2}>{Formik.errors.password}</span>}

                            <button
                                type="submit"
                                id={"btnEnter"}
                                className={s.welcB}
                            >►
                            </button>

                            <Typography
                                style={{
                                    color: styleSettings?.configs?.color[styleSettings?.color],
                                }}
                            >
                                Forgot your password?
                                <span
                                    className={s.updatePassword}
                                    onClick={() => {
                                        setRecreatePasswordMode(() => true)
                                    }}
                                >click here</span>
                            </Typography>
                        </form>
                    </>
                    : <>
                        <form>
                            <article><h2 className={s.Active} id={"modeLinks"}>Password recovery</h2></article>
                            <div>
                                <input type="email" id="email"{...Formik.getFieldProps("email")}/>
                                <span className={s.Tip}>Email</span>
                            </div>

                            {Formik.touched.email && Formik.errors.email &&
                                <span className={s.Error + " " + s.f1}>{Formik.errors.email}</span>}

                            <button
                                type="submit"
                                id={"btnEnter"}
                                className={s.welcB}
                                onClick={() => {
                                    axios.get(API + "users/newPassword")
                                        .then((response) => {

                                        })
                                        .catch((error) => {
                                            if (error) {
                                                //errorCallback(createErrorsForApiCall(error?.response?.data, error?.response?.data))
                                            }
                                        })
                                }}
                            >►
                            </button>

                            <Typography
                                style={{
                                    color: styleSettings?.configs?.color[styleSettings?.color],
                                    padding: 'unset'
                                }}
                            >
                                Your new password will be sent to this email address
                            </Typography>

                        </form>
                    </>
            }
        </div>
    )
}

export default Auth;