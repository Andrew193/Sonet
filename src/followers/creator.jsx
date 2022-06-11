import { AiOutlineMail, AiOutlineNumber, AiOutlineUser } from "react-icons/ai";
import { useHistory } from "react-router";
import Script from "../users/script"
function FollowersCreator(props) {
    const history=useHistory();
    return (<>{
        props.toMake.map((value) =>
            <div>
                <h3 onClick={()=>Script.openUserPofile(+value.id,history)}><AiOutlineUser />{value.userName}</h3>
                <span><AiOutlineMail /><a href={`mailto:${value.email}`}>{value.email}</a></span>
                <span><AiOutlineNumber />{value.id}</span>
            </div>)
    }</>)
}
export default FollowersCreator;