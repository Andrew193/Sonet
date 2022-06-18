import {Backdrop, CircularProgress} from "@mui/material";


function Loader(props) {
    const {
        open
    } = props;

    return (
        <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={open}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
    )
}

export default Loader;