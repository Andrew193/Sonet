import LatestPosts from "./latest"
import s from "./top-info.module.css"

function TopInfo() {
    return (
        <aside className={s.Container}>
            <LatestPosts />
            <span>© {(new Date()).getFullYear()} Sonet, Inc.</span>
        </aside>
    )
}
export default TopInfo;