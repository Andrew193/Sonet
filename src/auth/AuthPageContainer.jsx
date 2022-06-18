import {useFormik} from "formik";
import AuthPageForm from "./AuthPageForm"
import {ToastContainer} from 'react-toastify';
import Script from "./script.js"
import {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {notify} from "../App";
import {getSettings} from "../db";


function ContainerAuth() {
    const [isRegisterUser, setIsRegisterUser] = useState(true);
    const [redirect, setRedirect] = useState(false)

    const history = useHistory();

    const [settings, setSettings] = useState({});

    useEffect(() => {
        async function getData() {
            const response = await getSettings();

            setSettings(response[0])
        }

        getData();
    }, [])

    const Formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values, {resetForm}) => {
            Script.sendReq(values, resetForm, isRegisterUser, setRedirect, (message) => {
                const Msg = ({closeToast, toastProps}) => (
                    <div>
                        {message}
                    </div>
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