import withPageHeader from "../../hoc/withPageHeader"
import ClearUsers from "./clear.jsx";
import FindUserLine from "./findLine.jsx";

function ClearUsersContainer(props) {
    const {users} = props
    return (
        <>
            <div
                className={"Separator"}
                onClick={(e) => e.target.nextElementSibling.classList.toggle("Hide")}
            />
            <div className={"row"}>
                <ClearUsers toMake={users}/>
                <FindUserLine/>
            </div>
        </>)
}

export default withPageHeader(ClearUsersContainer, {path: "/users", Title: "Users"});