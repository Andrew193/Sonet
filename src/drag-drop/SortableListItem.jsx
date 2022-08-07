import {SortableElement} from "react-sortable-hoc";
import DragHandle from "./DragHandle";
import React from "react";

export default SortableElement(({row, item, DraggableRow, additionalConfig, setAllFields}) => {
    return (<tr className={"draggable-tr draggable-category-tr"}>
        <DragHandle/>
        <DraggableRow
            onClick={additionalConfig?.onClick}
            isOrderChangeMode
            item={item}
            setAllFields={setAllFields}
            {...row}
            {...additionalConfig}
        />
    </tr>)
});