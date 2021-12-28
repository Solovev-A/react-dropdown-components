import { useCallback, useRef } from "react";

const useInput = () => {
    const inputRef = useRef(null);

    const focus = useCallback(() => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }, [])

    const blur = useCallback(() => {
        if (inputRef && inputRef.current) {
            inputRef.current.blur();
        }
    }, [])

    return { inputRef, focus, blur };
}

export default useInput;