import {Box, Typography} from "@mui/material";
import Loader from "../common/spinner/Spinner";
import styles from "./table-loader.module.css";

type TableLoaderPropsType = {
    loaderLabel: string
}

function TableLoader(props: TableLoaderPropsType) {
    const {
        loaderLabel
    } = props;


    return (
        <Box className={styles.Container}>
            <Typography>{loaderLabel}</Typography>
            <Loader/>
        </Box>
    )
}

export default TableLoader;