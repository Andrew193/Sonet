import PageHeader from "../components/common/header/index"
import { Link } from "react-router-dom";

function WithPageHeader(Component, props) {
    const { path, Title } = props
    return (props) => {
        return (
            <>
                <PageHeader historyPath={"/"}>
                    <Link to={{ pathname: path }}>{Title}</Link>
                </PageHeader>
                <Component {...props} />
            </>
        )
    }
}

export default WithPageHeader;