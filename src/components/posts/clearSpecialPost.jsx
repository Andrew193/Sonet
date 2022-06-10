import withPageHeader from "../../hoc/withPageHeader"
import SortLine from "./SortLine.jsx";
import ClearPost from "./clear.jsx"
import { useContext } from "react";
import Context from "../../helpers/contextHelper"

function ClearSpecialPost(props) {
    const { socket, notify } = useContext(Context)
    const { posts, id } = props
    return (
        <>
            <div className={"Separator"}/>
            <ClearPost id={id} socket={socket} notify={notify} toMake={posts} />
            <SortLine />
        </>
    )
}

export default withPageHeader(ClearSpecialPost, { path: "/posts", Title: "Posts" });