import { NavLink } from "react-router-dom"
import Style from "./style.modyle.css"

function Page404() {
    return(
        <div className={Style.Container}>
            <h1>Sorry, the page <span>not found</span></h1>
            <p>Return to the <NavLink to={{pathname:"/"}}>Home Page</NavLink></p>
        </div>
    )
}

export default Page404;