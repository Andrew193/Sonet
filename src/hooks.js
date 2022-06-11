import {useEffect} from "react";

export function useOutsideClick(ref, onOutsideClick) {
    useEffect(() => {
        function outsideClickHandler(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                onOutsideClick()
            }
        }

        document.addEventListener("mousedown", outsideClickHandler);
        return () => {
            document.removeEventListener("mousedown", outsideClickHandler);
        };
    }, [ref]);
}