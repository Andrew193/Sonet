import MaintainedPageHeader from "../components/MaintainedPageHeader";
import React from "react";
import {headerListLinks} from "../vars";

function WithPageHeader(Component, props) {
    const {path, Title} = props

    const HeaderWrappedComponent = (props) => {
        return (
            <>
                <MaintainedPageHeader path={headerListLinks.base} linkPath={path} linkTitle={Title}/>
                <Component {...props} />
            </>
        )
    }
    return HeaderWrappedComponent;
}

export default WithPageHeader;