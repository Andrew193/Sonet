import {useFormik} from "formik";
import Auth from "./clear"
import {toast} from 'react-toastify';
import Script from "./script.js"
import {useEffect, useState} from "react";
import {useHistory} from "react-router";

function ContainerAuth() {
    const [flag, setFlag] = useState(true);
    const [flag2, setFlag2] = useState(false)

    const history = useHistory();

    useEffect(() => {
        if (flag2) {
            history.push("/");
        }
    }, [flag2])

    const Formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values, {resetForm}) => {
            Script.sendReq(values, resetForm, flag, setFlag2, toast)
        }
    })

    return (
        <Auth
            Formik={Formik}
            flag={flag}
            setFlag={setFlag}
        />
    )
}

export default ContainerAuth;