import s from "./posts.module.css"
import PostItem from "./PostItem";

function ClearPosts(props) {
    const {
        toMake,
        id,
        settings
    } = props;

    return (
        <div className={s.PostsCont + " onePostContainer"}>
            {toMake.posts.map((value) => <PostItem value={value} id={id} settings={settings}/>)}
        </div>
    )
}

export default ClearPosts;