import withPageHeader from "../../hoc/withPageHeader"
import ClearUsers from "./clear.jsx";
import FindUserLine from "./findLine.jsx";

function ClearUsersContainer(props) {
    const { users } = props
    return (<>
        <div className={"Separator"} onClick={(e) => e.target.nextElementSibling.classList.toggle("Hide")}></div>
        <ClearUsers toMake={users} />
        <FindUserLine />
    </>)
}

export default withPageHeader(ClearUsersContainer, { path: "/users", Title: "Users" });