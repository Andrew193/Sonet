import s from "./comments.module.css"
import DataHelper from "../../helpers/dateHelper"
import {v4 as uuidv4} from 'uuid';
import {useMemo} from "react";

function Comments(props) {
    const {
        toMake,
        commentId
    } = props;

    const postComments = useMemo(() => toMake.map((value) =>
        <div
            key={uuidv4()}
            style={{background: value?.id === commentId ? "#f3bdbd" : ""}}
        >
            <h2 className={"authorName"}>{value.createdBy}</h2>
            <p>{value.text}</p>
            <span>{DataHelper.fromNow(value.createdAt)}</span>
        </div>
    ), [JSON.stringify(toMake)]);

    return (
        <div className={s.Comments}>
            {postComments}
        </div>
    )
}

export default Comments;