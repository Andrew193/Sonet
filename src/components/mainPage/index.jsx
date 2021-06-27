import ClearMainPage from "./clear";

function MainPage(props) {
    const { open } = props
    return (
        <>
            <ClearMainPage open={open} />
        </>
    )
}
export default MainPage;