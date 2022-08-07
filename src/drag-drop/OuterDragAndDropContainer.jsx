import Placeholder from "./Placeholder";
import React from "react";

function OuterDragAndDropContainer(props) {
    const {
        isOrderChangeMode,
        DragAndDropConfig
    } = props;

    return (<>
        {
            !isOrderChangeMode
                ? <tbody>{DragAndDropConfig?.rowsList}</tbody>
                : <DragAndDropConfig.SortableListContainer {...DragAndDropConfig.sortableListContainerConfig}>
                    {DragAndDropConfig?.rowsList ||
                        <div className={"audit-container-lazy audit-container-lazy-constructor"}><Placeholder/>
                        </div>}
                </DragAndDropConfig.SortableListContainer>
        }
    </>)
}

export default OuterDragAndDropContainer;