import ClearMainPage from "./clear";

function MainPage(props) {
    const { open, socket, notify } = props
    return (
        <>
            <ClearMainPage open={open} socket={socket} notify={notify} />
        </>
    )
}
export default MainPage;