import MaintainedPageHeader from "../components/MaintainedPageHeader";
import React from "react";

function WithPageHeader(Component, props) {
    const {path, Title} = props

    const WrappedComponent = (props) => {
        return (
            <>
                <MaintainedPageHeader path={"/"} linkPath={path} linkTitle={Title}/>
                <Component {...props} />
            </>
        )
    }
    return WrappedComponent;
}

export default WithPageHeader;