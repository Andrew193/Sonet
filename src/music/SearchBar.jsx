import s from "./music.module.css";
import React from "react";
import PropTypes from "prop-types";

function SearchBar(props) {
    const {
        setSearch
    } = props;

    return (
        <div className={s.SearchBar}>
            <input
                onInput={(e) => setSearch(e.target.value)}
                id={"FocusInput"}
                placeholder={"Search by category"}
            />
        </div>
    )
}

SearchBar.propTypes = {
    setSearch: PropTypes.func
}

export default SearchBar