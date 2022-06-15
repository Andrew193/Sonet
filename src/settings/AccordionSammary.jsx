import {styled} from "@mui/material/styles";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import {AiOutlineArrowRight} from "react-icons/all";

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<AiOutlineArrowRight sx={{fontSize: '0.9rem'}}/>}
        {...props}
    />
))(({theme}) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

export default AccordionSummary;