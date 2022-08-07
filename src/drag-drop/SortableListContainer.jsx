import {SortableContainer} from "react-sortable-hoc";
import React from "react";

export default SortableContainer(({children}) => <tbody className={"droppable-table"}>{children}</tbody>);