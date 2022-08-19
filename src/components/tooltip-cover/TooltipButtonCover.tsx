import React from "react";

type TooltipButtonCoverProps = {
    children: React.ReactNode;
};

export const TooltipButtonCover = React.forwardRef(function MyComponent(props: TooltipButtonCoverProps, ref: React.Ref<any>) {
    return <div {...props} ref={ref} style={{display: "flex"}}>{props?.children}</div>
});