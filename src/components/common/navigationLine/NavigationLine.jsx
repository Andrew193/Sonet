import {MdKeyboardBackspace} from "react-icons/md";
import {useHistory} from "react-router-dom";
import s from "./style.module.css";
import CommonHelper from "../../../helpers/common";
import {hexToRgb} from "@mui/material";
import {useSettings} from "../../../hooks";

function PageHeader(props) {
    const {
        historyPath
    } = props;

    const history = useHistory();
    const {settings} = useSettings()

    return (
        <div
            className={"basicPageHead"}
            style={{
                display: "flex",
                color: settings?.configs?.color[settings?.color],
                borderBottom: `1px solid ${settings?.configs?.color[settings?.color] || "rgb(206, 204, 204)"}`,
            }}
        >
            <style>
                {`
                .backspaceBtn {
                transition: all ease 0.5s;
                }
                
                .backspaceBtn:hover{
                background-color: ${hexToRgb(settings?.configs?.background[settings?.background] || "rgb(231 231 240)")} !important;
                }  
                `}
            </style>
            <MdKeyboardBackspace
                id={s.Icon}
                className={"backspaceBtn"}
                onClick={() => {
                    CommonHelper.redirect(history, null, historyPath)
                }}
                style={{
                    color: settings?.configs?.color[settings?.color]
                }}
            />
            {props.children}
        </div>
    )
}

export default PageHeader;