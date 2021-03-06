import React, { useState } from "react";

export const BrushContext = React.createContext();

export const BRUSHES = {
    // DEFAULT: -1,
    DELETE: 0,
    LAND: 1,
    WATER: 2,
    MOUNTAIN: 3,
    FOREST: 4,
    SNOW: 5,
    DESERT: 6,
};

export const BrushProvider = ({ children }) => {
    const [ brush, setBrush ] = useState(BRUSHES.LAND);
    const [ coords, setCoords ] = useState('');

    return (
        <BrushContext.Provider value={{
            brush, setBrush,
            coords, setCoords
        }}>
            {children}
        </BrushContext.Provider>
    );
};