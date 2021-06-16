import s from "./index.module.css"
function Auth(props) {
    const { Formik, setFlag, flag } = props
    return (
        <div className={s.Container}>
            <form onSubmit={Formik.handleSubmit}>
                <article>
                    <h2 className={flag && s.Active} onClick={() => setFlag(true)}>Reg</h2>
                    <h2 className={!flag && s.Active} onClick={() => setFlag(false)}>Log</h2>
                </article>
                <div>
                    <input type="email" id="email" {...Formik.getFieldProps("email")} />
                    <span className={s.Tip}>Email</span>
                </div>
                {Formik.touched.email && Formik.errors.email && <span className={s.Error + " " + s.f1}>{Formik.errors.email}</span>}
                <div>
                    <input type="password" id="password" {...Formik.getFieldProps("password")} />
                    <span className={s.Tip}>Password</span>
                </div>
                {Formik.touched.password && Formik.errors.password && <span className={s.Error + " " + s.f2}>{Formik.errors.password}</span>}
                <button type="submit" className={s.welcB}>►</button>
                <p>Forgot your password? <a href="/">click here</a></p>
            </form>
        </div>
    )
}
export default Auth;