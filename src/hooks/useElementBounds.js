import { useCallback, useEffect, useState } from "react";

const useElementBounds = (elementRef) => {
    const [elementBounds, setElementBounds] = useState();

    const updateElementBounds = useCallback(() => {
        setElementBounds(elementRef.current.getBoundingClientRect());
    }, [elementRef]);

    useEffect((() => {
        updateElementBounds();
        console.log('Добавляем события окна');
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

