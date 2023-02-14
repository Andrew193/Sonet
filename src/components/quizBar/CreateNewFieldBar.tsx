import React, {useRef} from "react";
import quizStyle from "./quiz.module.css";
import {getElementsThemeConfig, getPropertiesConfig} from "../../utils";
import {useSettings} from "../../hooks";
import {AiOutlinePlusCircle} from "react-icons/all";
import {useEffect, useMemo, useState} from "react";
import {withDelay} from "../../app/helpers";
import {useDispatch} from "react-redux";
import {setPostInformation} from "../../app/postReducer";
import PropTypes from "prop-types";

function getInputColor(optionsLength: number) {
    return {
        1: "#09ff090f",
        2: "rgba(120,255,9,0.06)",
        3: "rgba(255,243,9,0.06)",
        4: "rgba(255,132,9,0.06)",
        5: "rgba(255,9,9,0.06)",
    }[optionsLength]
}

type CreateNewFieldBar = {
    setHeaderFields: (p: (headerFields: { label: string }[]) => any) => any
}

function CreateNewFieldBar(props: CreateNewFieldBar) {
    const {
        setHeaderFields
    } = props;

    const {settings} = useSettings();
    const dispatch = useDispatch();
    const [question, setQuestion] = useState<string | null>();
    const [option, setOption] = useState<any[] | null>([]);
    const [options, setOptions] = useState<any[]>([]);
    const optionRef = useRef<HTMLInputElement>(null);

    const onQuestionHandler = withDelay(100, (questionText: string) => setQuestion(questionText));
    const onOptionHandler = withDelay(100, (optionText: any[]) => setOption(optionText));

    const onOptionCreate = () => {
        setOptions((state) => {
            setHeaderFields((headerFields) => [...headerFields, {label: option}]);
            return [...state, option]
        });
        setOption(null);
        optionRef!.current!.value = "";
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
                           onInput={({target}) => onQuestionHandler((target as HTMLInputElement).value)}
                    />
                </p>
                <p>
                    <label htmlFor={"option"} style={{flex: "2 0"}}>Option:</label>
                    <span style={{flex: "1 0"}}/>
                    <input id={"option"} type={"text"} name={"option"} style={{flex: "8 0"}}
                           ref={optionRef}
                           onInput={({target}) => onOptionHandler((target as HTMLInputElement).value)}
                    />
                    <AiOutlinePlusCircle style={{flex: "1 0"}} className={quizStyle.CreateOptionButton}
                                         onClick={() => onOptionCreate()} id={"addOption"}/>
                </p>
            </form>
        </>
    )
}

CreateNewFieldBar.propTypes = {
    setHeaderFields: PropTypes.func
}

export default CreateNewFieldBar;