import { useContext, useEffect, useState } from "react";
import ClearPosts from "./clear.jsx";
import Script from "./script.js"
import Skeleton from 'react-loading-skeleton';
import SortLine from "./SortLine.jsx"
import s from "./posts.module.css"
import { Link, withRouter } from "react-router-dom";
import PageHeader from "../components/common/navigationLine/NavigationLine.jsx";
import Context from "../helpers/contextHelper"
function PostsContainer(props) {
    const [posts, setPosts] = useState(false);
    const { socket, notify } = useContext(Context)
    const { id } = JSON.parse(localStorage.getItem("userInfo"))
    socket.on("postUpdate", (updatedPosts) => setPosts({ posts: updatedPosts }))
    useEffect(() => {
        const id = props.match.params.id
        if (id && typeof (+id) === "number") {
            Script.getSelectedPost(+id)
                .then((postF) => setPosts(postF))
                .catch((error) => { error && notify(error?.response?.data?.posts) })
        } else {
            Script.getPosts()
                .then((postF) => setPosts(postF))
                .catch((error) => { error && notify(error?.response?.data?.error) })
        }
    }, [props.match.params.id])
    return (
        <div className={s.Container}>
            <PageHeader historyPath={"/"}>
                <Link to={{ pathname: "/posts" }}>Posts</Link>
            </PageHeader>
            <div className={"Separator"} onClick={(e) => e.target.nextElementSibling.classList.toggle("Hide")}></div>
            {posts ? <><ClearPosts id={id} toMake={posts} />
                <SortLine /> </> :
                <Skeleton height={"60px"} count={10} />}
        </div>
    )
}

export default withRouter(PostsContainer);