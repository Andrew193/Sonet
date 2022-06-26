import s from "./posts.module.css";

function Placeholder(props) {
    const {
        id
    } = props;

    return (
        <div
            className={s.ldsRoller}
            id={id}
            style={{
                marginLeft: '0%',
                marginTop: '0%',
                minHeight: 'unset',
                minWidth: 'unset'
            }}
        >
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
        </div>
    );
}

export default Placeholder;