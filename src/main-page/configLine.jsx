import { useHistory } from "react-router";
import s from "./main-page.module.css"

function ConfigLine(props) {
    const history=useHistory();
    return (
        <div className={s.ConfigLine}>
            <h3>Welcome to Sonet!</h3>
            <p>This is the best place to see what is happening in the world. Find some people and topics to follow now or change your information.</p>
            <p>
                <button className={"button"} onClick={() => props.open()}>Update your information</button>
                <button className={"button"} onClick={()=>history.push("/users")}>Follow others</button>
            </p>
        </div>
    )
}
export default ConfigLine;
