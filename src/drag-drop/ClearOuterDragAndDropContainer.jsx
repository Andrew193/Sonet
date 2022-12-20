import React from "react";
import PropTypes from "prop-types";

function ClearOuterDragAndDropContainer(props) {
    const {DragAndDropConfig} = props;

    return (<DragAndDropConfig.SortableListContainer {...DragAndDropConfig.sortableListContainerConfig}>
        {DragAndDropConfig?.rowsList}
    </DragAndDropConfig.SortableListContainer>)
}

ClearOuterDragAndDropContainer.propTypes = {
    DragAndDropConfig: PropTypes.object
}

export default ClearOuterDragAndDropContainer;