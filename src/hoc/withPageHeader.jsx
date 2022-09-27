import MaintainedPageHeader from "../components/MaintainedPageHeader";

function WithPageHeader(Component, props) {
    const {path, Title} = props

    return (props) => {
        return (
            <>
                <MaintainedPageHeader path={"/"} linkPath={path} linkTitle={Title}/>
                <Component {...props} />
            </>
        )
    }
}

export default WithPageHeader;