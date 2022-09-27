import Spinner from "../res/img/Spinner-1s-200px.gif";

function Placeholder(props) {
    const {
        id
    } = props;

    return (
        <div id={id}>
           <img src={Spinner} width={"60px"} alt={"Spinner"}/>
        </div>
    );
}

export default Placeholder;