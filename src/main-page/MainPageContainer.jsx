import ClearMainPage from "./ClearMainPage";

function MainPage(props) {
    const {open} = props;

    return (
        <>
            <ClearMainPage open={open}/>
        </>
    )
}

export default MainPage;