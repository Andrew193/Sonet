import withPageHeader from "../../hoc/withPageHeader"
import SortLine from "./SortLine.jsx";
import ClearPost from "./clear.jsx"

function ClearSpecialPost(props) {
    const { notify, socket, posts, id } = props
    return (
        <>
            <div className={"Separator"}></div>
            <ClearPost id={id} socket={socket} notify={notify} toMake={posts} />
            <SortLine />
        </>
    )
}

export default withPageHeader(ClearSpecialPost, { path: "/posts", Title: "Posts" });