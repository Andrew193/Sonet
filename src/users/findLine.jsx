import s from "./users.module.css"
import Script from "./script.js"
import {useRef} from "react"
import {useHistory} from "react-router-dom"

function FindUserLine() {
    let Input = useRef()
    const hist = useHistory();

    return (
        <div
            className={`${s.FindUserLine} col-xs-4 col-sm-4`}
            data-testid={"FindLine"}
            style={{padding: 'unset'}}
        >
            <div
                className={"wrap-link-line"}
                style={{justifyContent: 'center'}}
            >
                <button
                    className={"button"}
                >
                    Hide search panel
                </button>
            </div>

            <div data-testid={"inner"}>
                <input ref={(el) => Input = el} defaultValue={"1"} onInput={(e) => {
                    e.target.value = Script.input(e.target.value)
                }}
                       placeholder={"Input user ID"}/>
                <button className={"button"} onClick={() => Script.openUser(null, hist, Input.value)}>Find by ID
                </button>
            </div>
        </div>
    )
}

export default FindUserLine;