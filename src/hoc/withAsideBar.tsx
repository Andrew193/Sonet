import React from "react";
import Components from "../components";

export function withAsideBar(Component: any) {

    const AsideBarWrappedComponent = (props: any) => {
        return (
            <div className={"aside-container"}>
                <Component {...props}/>
                <Components.AsideBarContainer/>
            </div>
        )
    }

    return AsideBarWrappedComponent;
}