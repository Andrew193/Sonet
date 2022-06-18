import {useHistory} from "react-router";
import s from "./main-page.module.css"
import {buttonsConfig} from "../createPost/CreatePostLine";

function ConfigLine(props) {
    const {
        customStyle
    } = props;

    const history = useHistory();

    return (
        <div
            className={s.ConfigLine}
        >
            <h3
                style={{
                    fontWeight: "bold"
                }}
            >Welcome to Sonet!</h3>
            <p
                style={{
                    fontSize: customStyle?.fontSize,
                    background: customStyle?.background,
                }}
            >This is the best place to see what is happening in the world. Find some people and topics to follow now
                or change your information.</p>
            <p>
                <button
                    className={`button ${buttonsConfig[customStyle?.color]}`}
                    onClick={() => props.open()}
                >
                    Update your information
                </button>
                <button
                    className={`button ${buttonsConfig[customStyle?.color]}`}
                    onClick={() => history.push("/users")}
                >
                    Follow others
                </button>
            </p>
        </div>
    )
}

export default ConfigLine;
