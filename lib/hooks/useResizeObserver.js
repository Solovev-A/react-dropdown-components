import { useRef, useEffect } from 'react';

const useResizeObserver = (callback, element) => {
    const observer = useRef(null);

    useEffect(() => {
        const current = element && element.current;

        if (observer && observer.current && current) {
            observer.current.unobserve(current);
        }

        observer.current = new ResizeObserver(callback);
        if (current) {
            observer.current.observe(current);
        }

        return () => {
            if (observer && observer.current && current) {
                observer.current.unobserve(current);
            }
        }
    }, [callback, element])
}

export default useResizeObserver;