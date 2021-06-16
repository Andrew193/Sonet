
import LatestPosts from "./latest"
import s from "./style.module.css"

function TopInfo(props) {
    return (
        <aside className={s.Container}>
            <LatestPosts socket={props.socket}/>
            © 2021 Sonet, Inc.
        </aside>
    )
}
export default TopInfo;