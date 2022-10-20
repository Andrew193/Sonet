import quizStyle from "./quiz.module.css";
import {getElementsThemeConfig, getPropertiesConfig} from "../../utils";
import {useSettings} from "../../hooks";
import {AiOutlinePlusCircle} from "react-icons/all";
import {useEffect, useMemo, useState} from "react";
import {withDelay} from "../../app/helpers";
import {useDispatch, useSelector} from "react-redux";
import {setPostInformation} from "../../app/postReducer";

function getInputColor(optionsLength) {
    return {
        1: "#09ff090f",
        2: "rgba(120,255,9,0.06)",
        3: "rgba(255,243,9,0.06)",
        4: "rgba(255,132,9,0.06)",
        5: "rgba(255,9,9,0.06)",
    }[optionsLength]
}

function CreateNewFieldBar(props) {
    const {
        setHeaderFields
    } = props;

    const {settings} = useSettings();
    const dispatch = useDispatch();
    const [question, setQuestion] = useState();
    const [option, setOption] = useState([]);
    const [options, setOptions] = useState([]);
    let optionRef = null;

    const onQuestionHandler = withDelay(100,
        (questionText) => setQuestion(questionText));
    const onOptionHandler = withDelay(100,
        (optionText) => setOption(optionText));

    const onOptionCreate = () => {
        setOptions((state) => {
            setHeaderFields((headerFields) => [...headerFields, {label: option}]);
            return [...state, option]
        });
        setOption(null);
        optionRef.value = "";
    }
    const inputBackground = useMemo(() => getInputColor(options.length), [options.length])

    useEffect(() => {
        dispatch(setPostInformation({quiz: {name: question, options: options}}));
    }, [question, options])

    return (
        <>
            <style>{`
            #option {
            background:${inputBackground};
            pointer-events: ${options.length === 5 ? "none" : "auto"};
            }
            #addOption {
            pointer-events: ${options.length === 5 ? "none" : "auto"};
            }
            `}</style>
            <form className={quizStyle.NewFieldContainer} style={{
                ...getElementsThemeConfig(settings, getPropertiesConfig(true,
                    "rgb(180, 180, 180)"))
            }}>
                <p>
                    <label htmlFor={"question"} style={{flex: "2 0"}}>Your question:</label>
                    <span style={{flex: "1 0"}}/>
                    <input id={"question"} type={"text"} name={"question"} style={{flex: "9 0"}}
                           onInput={(e) => onQuestionHandler(e.target.value)}
                    />
                </p>
                <p>
                    <label htmlFor={"option"} style={{flex: "2 0"}}>Option:</label>
                    <span style={{flex: "1 0"}}/>
                    <input id={"option"} type={"text"} name={"option"} style={{flex: "8 0"}}
                           ref={(el) => optionRef = el}
                           onInput={(e) => onOptionHandler(e.target.value)}
                    />
                    <AiOutlinePlusCircle style={{flex: "1 0"}} className={quizStyle.CreateOptionButton}
                                         onClick={() => onOptionCreate()} id={"addOption"}/>
                </p>
            </form>
        </>
    )
}

export default CreateNewFieldBar;