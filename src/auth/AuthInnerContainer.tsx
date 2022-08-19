import s from "./auth.module.css";
import {Typography} from "@mui/material";
import {UseSettingsInterface} from "../hooks";
import React from "react"

type RecreatePasswordModeType<T> = T extends false
    ? (fn: () => boolean) => void
    : T extends true
        ? (newState: boolean) => void
        : any

export type AuthInnerContainerType<T> = {
    isRegisterUser: boolean,
    Formik: any,
    setIsRegisterUser: React.Dispatch<React.SetStateAction<boolean>>,
    setRecreatePasswordMode: RecreatePasswordModeType<T>,
    styleSettings: UseSettingsInterface
}

function AuthInnerContainer(props: AuthInnerContainerType<false>) {
    const {
        Formik,
        isRegisterUser,
        setIsRegisterUser,
        styleSettings,
        setRecreatePasswordMode
    } = props;

    return (
        <>
            <form
                onSubmit={Formik.handleSubmit}
            >
                <article>
                    <h2
                        className={isRegisterUser ? s.Active : ""}
                        onClick={() => setIsRegisterUser(true)}
                        id={"modeLinks"}
                    >Log up</h2>
                    <h2
                        id={"modeLinks"}
                        className={!isRegisterUser ? s.Active : ""}
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
    )
}

export default AuthInnerContainer;