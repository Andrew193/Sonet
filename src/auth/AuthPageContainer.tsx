import {useFormik} from "formik";
import AuthPageForm from "./AuthPageForm"
import {ToastContainer} from 'react-toastify';
import Script from "./script.js"
import {ReactNode, useEffect, useState} from "react";
import {useHistory} from "react-router";
import {notify} from "../App";
import {useSettings} from "../hooks";

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
            Script.sendReq(values, resetForm, isRegisterUser, setRedirect, (message: ReactNode | string) => {
                const Msg = () => (
                    <div>{message}</div>
                )
                notify(<Msg/>);
            })
        }
    })

    useEffect(() => {
        if (redirect) {
            history.push("/");
        }
    }, [redirect])

    return (
        <>
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