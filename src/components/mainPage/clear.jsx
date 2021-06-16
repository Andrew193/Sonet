import { Link } from "react-router-dom";
import CreatePost from "../createPost";
import ConfigLine from "./configLine";
import s from "./index.module.css"


function ClearMainPage(props) {
    const { socket, open, notify } = props;
    return (
        <main className={s.Container}>
            <div className={"basicPageHead"}><Link to={{ pathname: "/" }}>Home</Link></div>
            <CreatePost socket={socket} notify={notify}></CreatePost>
            <div className={"Separator"} onClick={(e) => e.target.nextElementSibling.classList.toggle("Hide")}></div>
            <ConfigLine open={open} />
        </main>
    )
}
export default ClearMainPage;