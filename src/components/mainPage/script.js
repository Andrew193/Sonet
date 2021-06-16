import axios from "axios";
import Script from "../header/script.js"


function UpdateInfo(values, close,history) {
    axios.put("https://sonet34.herokuapp.com/api/users/update", values)
    close();
    Script.leave(history)
}

const obj={ UpdateInfo }

export default obj;