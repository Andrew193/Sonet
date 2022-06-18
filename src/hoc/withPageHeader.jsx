import PageHeader from "../components/common/navigationLine/NavigationLine"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getSettings} from "../db";

function ComponentWrap(props) {
    const {
        Title,
        path
    } = props;

    const [settings, setSettings] = useState({});

    useEffect(() => {
        async function getData() {
            const response = await getSettings();

            setSettings(response[0])
        }

        getData();
    }, [])

    return (
        <>
            <PageHeader historyPath={"/"}>
                <Link
                    to={{pathname: path}}
                    style={{
                        fontSize: settings?.configs?.size[settings?.fontSize],
                        background: settings?.configs?.background[settings?.background],
                    }}
                >{Title}</Link>
            </PageHeader>
        </>
    )
}

function WithPageHeader(Component, props) {
    const {path, Title} = props


    return (props) => {
        return (
            <>
                <ComponentWrap
                    path={path}
                    Title={Title}
                />
                <Component {...props} />
            </>
        )
    }
}

export default WithPageHeader;