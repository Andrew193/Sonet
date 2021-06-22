import LatestPosts from "./latest"
import s from "./style.module.css"

function TopInfo(props) {
    return (
        <aside className={s.Container}>
            <LatestPosts socket={props.socket} />
            <span>© {(new Date()).getFullYear()} Sonet, Inc.</span>
        </aside>
    )
}
export default TopInfo;