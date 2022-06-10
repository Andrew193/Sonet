import {useFormik} from "formik";
import Auth from "./clear"
import {toast, ToastContainer} from 'react-toastify';
import Script from "./script.js"
import {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {notify} from "../../App";

function ContainerAuth() {
    const [flag, setFlag] = useState(true);
    const [flag2, setFlag2] = useState(false)

    const history = useHistory();

    const Formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values, {resetForm}) => {
            Script.sendReq(values, resetForm, flag, setFlag2, (message) => {
                console.log(message)
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
        if (flag2) {
            history.push("/");
        }
    }, [flag2])

    return (
        <>
            <Auth
                Formik={Formik}
                flag={flag}
                setFlag={setFlag}
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