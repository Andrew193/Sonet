const React = require("react");

function ClearOuterDragAndDropContainer(props) {
    const {DragAndDropConfig} = props;

    return (<DragAndDropConfig.SortableListContainer {...DragAndDropConfig.sortableListContainerConfig}>
        {DragAndDropConfig?.rowsList}
    </DragAndDropConfig.SortableListContainer>)
}

export default ClearOuterDragAndDropContainer;