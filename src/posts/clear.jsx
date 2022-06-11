import { AiOutlineDislike, AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import DataHelper from "../helpers/dateHelper.js"
import s from "./posts.module.css"
import Script from "./script.js"
import { v4 as uuidv4 } from 'uuid';
import { useContext } from "react";
import Context from "../helpers/contextHelper"
function ClearPosts(props) {
    const { toMake, id } = props;
    const { socket, notify } = useContext(Context)
    const history = useHistory();
    return (
        <div className={s.PostsCont}>
            {toMake.posts.map((value) => {
                return <><div key={uuidv4()} className={s.Item} data-id={value.id}>
                    <div>
                        <h3><Link to={{ pathname: `/users/${+value.userId}` }}>{value.createdBy}</Link></h3>
                        <p>{value.text}</p>
                        <p>
                            <span onClick={() => Script.like(String(value.id), String(id), value.likeCount, notify
                                , value.dislikeCount, socket)} className={s.like}>
                                <AiOutlineLike size={"24px"} />{value.likeCount}</span>
                            <span onClick={() => Script.dislike(String(value.id), String(id), value.dislikeCount,
                                notify, value.likeCount, socket)} className={s.dislike}>
                                <AiOutlineDislike size={"24px"} />{value.dislikeCount}</span>
                            <span className={s.com} onClick={() => Script.getComment(history, value.id)
                            }><AiOutlineComment size={"24px"} />{value.comCount}</span>
                        </p>
                    </div>
                    <span className={s.Time}>{DataHelper.fromNow(value.createdAt)}</span>
                </div>
                </>
            })}
        </div>
    )
}
export default ClearPosts;