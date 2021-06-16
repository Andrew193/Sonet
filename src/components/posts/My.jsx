import axios from "axios";
import { useEffect, useState } from "react";
import ClearPost from "./clear.jsx"
import { MdKeyboardBackspace } from "react-icons/md";
import Skeleton from 'react-loading-skeleton';
import s from "./style.module.css"
import SortLine from "./SortLine.jsx";
import { Link, useHistory, withRouter } from "react-router-dom";
function My(props) {
    const id = props.location.state.id
    const { socket, notify } = props;
    const history = useHistory()
    const [posts, setPosts] = useState(false)
    socket.on("MyPostUpdate", (updatedPosts) => {
        setPosts({ posts: updatedPosts })
    })
    useEffect(() => {
        axios.get("https://sonet34.herokuapp.com/api/post/my", { params: { userId: id } })
            .then((response) => setPosts({ posts: response.data.posts }))
            .catch((error) => console.log(error))
    }, [id])
    return (
        <div className={s.Container} id={s.HF}>
            {posts ? <>
                <div className={"basicPageHead" + " " + s.Pheader}>
                    <MdKeyboardBackspace className={s.Icon} onClick={() => history.push("/posts")} />
                    <div><Link to={{ pathname: "/posts" }}>Posts</Link></div>
                </div>
                <div className={"Separator"}></div>
                <ClearPost id={id} socket={socket} notify={notify} toMake={posts} />
                <SortLine /></> :
                <Skeleton height={"50px"} count={5} />}
        </div>
    )
}
export default withRouter(My);