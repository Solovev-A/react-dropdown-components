import { useEffect, useState } from "react";

import { getDropdownPosition } from "../utils";

const useDropdownPosition = (parentBounds, dropdownMaxHeight) => {
    const [dropdownPosition, setDropdownPosition] = useState();

    useEffect(() => {
        // при изменении позиции родительского элемента, определяем направление появления выпадающего списка
        parentBounds && setDropdownPosition(getDropdownPosition(parentBounds, dropdownMaxHeight));
    }, [parentBounds, dropdownMaxHeight])

    return dropdownPosition;
}

export default useDropdownPosition;