import quizStyle from "./quiz.module.css";
import {useState} from "react";
import {useDragAndDrop} from "../../drag-drop/useDragAndDrop";
import ClearOuterDragAndDropContainer from "../../drag-drop/ClearOuterDragAndDropContainer";
import CreateNewFieldBar from "./CreateNewFieldBar";

function QuizLine(props) {
    const {
        label,
        item
    } = props;

    return <div key={item?.index}>{label}</div>
}

function QuizBody() {
    const [headerFields, setHeaderFields] = useState([]);
    const DragAndDropConfig = useDragAndDrop(setHeaderFields, headerFields, {
        isOrderChangeMode: true,
        formId: 0,
        buttons: []
    }, QuizLine);

    return (
        <main className={quizStyle.QuizBodyContainer}>
            <div className={"Separator"} style={{margin: "5px 0px"}}/>
            <h3>Create your quiz</h3>
            <CreateNewFieldBar
                setHeaderFields={setHeaderFields}
            />
            <h3>Quiz options</h3>
            <div className={quizStyle.OptionsContainer}>
                <ClearOuterDragAndDropContainer DragAndDropConfig={DragAndDropConfig}/>
            </div>
        </main>
    )
}

export default QuizBody;