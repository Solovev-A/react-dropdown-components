// Позаимствовано из: https://stackoverflow.com/a/54292872/13467303

import { useEffect, useRef } from "react";

const useOuterClick = (callback) => {
    const callbackRef = useRef(); // initialize mutable callback ref
    const innerRef = useRef(); // returned to client, who sets the "border" element

    // update callback on each render, so second useEffect has most recent callback
    useEffect(() => { callbackRef.current = callback; });
    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);

        function handleClick(e) {
            if (innerRef.current && callbackRef.current &&
                !innerRef.current.contains(e.target)
            ) {
                callbackRef.current(e);
            }
        }
    }, []);

    return innerRef;
}

export default useOuterClick;