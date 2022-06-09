

function ProfileContainer() {
    const { userName, id } = JSON.parse(localStorage.getItem("userInfo"));

    return (
        <>
            <h2>{userName || "Log in again"}</h2>
            <p>User id {id || "Log in again"}</p>
        </>
    )
}
export default ProfileContainer;