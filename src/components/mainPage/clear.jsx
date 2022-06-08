import {Link} from "react-router-dom";
import CreatePost from "../createPost";
import ConfigLine from "./configLine";
import s from "./index.module.css"

function ClearMainPage(props) {
    const {open} = props;
    return (
        <main className={s.Container}>
            <div className={"basicPageHead"}><Link to={{pathname: "/"}}>Home</Link></div>
            <CreatePost/>
            <div
                className={"Separator"}
                onClick={(e) => e.target.nextElementSibling.classList.toggle("Hide")}
            />
            <ConfigLine open={open}/>
        </main>
    )
}

export default ClearMainPage;