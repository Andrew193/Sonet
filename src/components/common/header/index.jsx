import { MdKeyboardBackspace } from "react-icons/md";
import { useHistory } from "react-router-dom";
import s from "./style.module.css"
import CommonHelper from "../../../helpers/common"
function PageHeader(props) {
    const history = useHistory();
    const { historyPath } = props;
    return (
        <div className={"basicPageHead"} style={{ display: "flex" }}>
            <MdKeyboardBackspace id={s.Icon} onClick={() => CommonHelper.redirect(history, null, historyPath)} />
            {props.children}
        </div>
    )
}

export default PageHeader;