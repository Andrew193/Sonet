import s from "./users.module.css"
import Script from "./script.js"
import { useRef } from "react"
import { useHistory } from "react-router-dom"
function FindUserLine() {
    let Input=useRef()
    const hist=useHistory();
    return (
        <div className={s.FindUserLine} data-testid={"FindLine"}>
            <div className={"Separator"} onClick={(e) => Script.HidePanel(e, s)}></div>
            <div data-testid={"inner"}><input ref={(el)=>Input=el} defaultValue={"1"} onInput={(e) => { e.target.value = Script.input(e.target.value) }}
             placeholder={"Input user ID"}></input>
            <button className={"button"} onClick={()=>Script.openUser(null,hist,Input.value)}>Find by ID</button></div>
        </div>
    )
}

export default FindUserLine;