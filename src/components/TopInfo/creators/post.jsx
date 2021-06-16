import { useHistory } from "react-router-dom";
import dateHelper from "../../../helpers/dateHelper.js"
import script from "../script.js";
import { v4 as uuidv4 } from 'uuid';
function PostCreator(props) {
    const history=useHistory();
    return (
        <>
            {props.toCreate.map((value) => {
                return <div key={uuidv4()} onClick={()=>script.openFull(history,value.id)} data-id={value.id}>
                    <span>{dateHelper.fromNow(value.createdAt)}</span>
                    <h4>Created by @{value.createdBy}</h4>
                    <p>{value.text.slice(0, 75)} </p>
                    <p>Like:{value.likeCount} Dislike:{value.dislikeCount} Comments:{value.comCount}</p>
                </div>
            })}
        </>
    )
}
export default PostCreator;