import s from "./comments.module.css"
import DataHelper from "../../helpers/dateHelper"
import { v4 as uuidv4 } from 'uuid';

function Comments(props) {

    return(
        <div className={s.Comments}>
            {props.toMake.map((value)=>
            <div key={uuidv4()}>
                <h2 className={"authorName"}>{value.createdBy}</h2>
                <p>{value.text}</p>
                <span>{DataHelper.fromNow(value.createdAt)}</span>
            </div>)}
        </div>
    )
}
export default Comments;