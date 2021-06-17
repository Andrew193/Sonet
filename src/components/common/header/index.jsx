import { MdKeyboardBackspace } from "react-icons/md";
import { useHistory } from "react-router-dom";
import s from "./style.module.css"
function PageHeader(props) {
    const history = useHistory();
    const { historyPath } = props;
    return (
        <div className={"basicPageHead"} style={{ display: "flex" }}>
            <MdKeyboardBackspace className={s.Icon} onClick={() => history.push(historyPath)} />
            {props.children}
        </div>
    )
}

export default PageHeader;