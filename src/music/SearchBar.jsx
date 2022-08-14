import s from "./music.module.css";

function SearchBar(props) {
    const {
        setSearch
    } = props;

    return (
        <div
            className={s.SearchBar}
        >
            <input
                onInput={(e) => {
                    setSearch(e.target.value)
                }}
                placeholder={"Search by category"}
            />
        </div>
    )
}

export default SearchBar