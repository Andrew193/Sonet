import SortableListItem from "./SortableListItem";
import SortableListContainer from "./SortableListContainer"
import {arrayMoveImmutable} from "array-move";
import React, {useMemo} from "react";
import _ from "lodash";
import {v4 as uuidv4} from "uuid";

const getSortableListContainerConfig = (onSortEnd) => ({
    distance: 1,
    useDragHandle: true,
    className: "d-flex flex-wrap",
    onSortEnd: onSortEnd
})

export function useDragAndDrop(setAllFields, allFields, BasicRowConfig, BasicRow) {
    function onSortEnd({oldIndex, newIndex}) {
        setAllFields(arrayMoveImmutable(allFields, oldIndex, newIndex))
    }

    const rowsList = useMemo(() =>
        !_.isEmpty(allFields)
            ? allFields?.map((row, index) => {
                return !BasicRowConfig?.isOrderChangeMode
                    ? <tr className={"fs_cursor-pointer"}><BasicRow{...BasicRowConfig}{...row}/></tr>
                    : <SortableListItem
                        index={index}
                        row={row}
                        additionalConfig={{
                            formId: BasicRowConfig?.formId,
                            buttons: BasicRowConfig?.buttons,
                            onClick: BasicRowConfig?.onClick,
                            item: {
                                ...row,
                                index
                            },
                            setAllFields: setAllFields
                        }}
                        DraggableRow={BasicRow}
                        key={uuidv4()}
                    />
            }) : null, [JSON.stringify(allFields), BasicRowConfig?.isOrderChangeMode, BasicRowConfig?.buttons])

    return {
        SortableListContainer,
        SortableListItem,
        sortableListContainerConfig: getSortableListContainerConfig(onSortEnd),
        rowsList
    }
}