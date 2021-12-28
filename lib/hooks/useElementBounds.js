import { useCallback, useEffect, useState } from "react";
import useResizeObserver from './useResizeObserver';

const useElementBounds = (elementRef) => {
    const [elementBounds, setElementBounds] = useState();

    const updateElementBounds = useCallback(() => {
        if (elementRef && elementRef.current) {
            setElementBounds(elementRef.current.getBoundingClientRect());
        }
    }, [elementRef]);

    useResizeObserver(updateElementBounds, elementRef);

    useEffect((() => {
        updateElementBounds();
        window.addEventListener('resize', updateElementBounds);
        window.addEventListener('scroll', updateElementBounds);

        return () => {
            window.removeEventListener('resize', updateElementBounds);
            window.removeEventListener('scroll', updateElementBounds);
        }
    }), [updateElementBounds])

    return elementBounds;
}

export default useElementBounds;

