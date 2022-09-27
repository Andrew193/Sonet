import {Link} from "react-router-dom";
import PageHeader from "./common/navigationLine/NavigationLine";
import {getElementsThemeConfig, getPropertiesConfig} from "../utils";
import {useSettings} from "../hooks";

type MaintainedPageHeaderPropsType = {
    path: string,
    linkPath: string,
    linkTitle: string
}

function MaintainedPageHeader(props: MaintainedPageHeaderPropsType) {
    const {settings} = useSettings();

    return (
        <PageHeader historyPath={props.path}>
            <Link to={{pathname: props.linkPath}}
                  style={{
                      ...getElementsThemeConfig(settings, getPropertiesConfig(false, '', false,
                          '', "rgb(0, 0, 0)"))
                  }}
            >{props.linkTitle}</Link>
        </PageHeader>
    )
}

export default MaintainedPageHeader;