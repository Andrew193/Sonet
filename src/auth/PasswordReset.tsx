import s from "./auth.module.css";
import HttpHelper from "../helpers/httpHelper";
import {Typography} from "@mui/material";
import {useFormik} from "formik";
import {notify} from "../App";
import {AuthInnerContainerType} from "./AuthInnerContainer";

type PasswordReset = Pick<AuthInnerContainerType<true>, "styleSettings" | "setRecreatePasswordMode">

function PasswordReset(props: PasswordReset) {
    const {
        styleSettings,
        setRecreatePasswordMode
    } = props;

    const Formik = useFormik({
        initialValues: {email: ""},
        onSubmit: (values) => {
            HttpHelper.USERS.resetPassword(values.email)
                .then(() => notify("Check you email"))
                .catch(() => notify("Something went wrong"))
        }
    })

    return (
        <>
            <form onSubmit={Formik.handleSubmit}>
                <article><h2 className={s.Active} id={"modeLinks"}>Password recovery</h2></article>
                <div>
                     <span className={s.Span}>
                         <input type="email" id="email" {...Formik.getFieldProps("email")}/>
                     </span>
                    <span className={s.Tip}>Email</span>
                </div>

                {Formik.touched.email && Formik.errors.email &&
                    <span className={s.Error + " " + s.f1}>{Formik.errors.email}</span>}

                <button
                    type="submit"
                    id={"btnEnter"}
                    className={s.welcB}
                >►
                </button>

                <Typography
                    style={{
                        color: styleSettings?.configs?.color[styleSettings?.color],
                        padding: 'unset'
                    }}
                >
                    Your new password will be sent to this email address.
                    <span
                        className={s.updatePassword}
                        onClick={() => setRecreatePasswordMode(false)}
                    >Go back</span>
                </Typography>

            </form>
        </>
    )
}

export default PasswordReset;