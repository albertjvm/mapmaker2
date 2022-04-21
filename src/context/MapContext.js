import React, { useCallback, useEffect, useRef, useState } from "react";

export const MapContext = React.createContext();

const TILE_TYPES = {
    NONE: 0,
    LAND: 1,
    WATER: 2
}

export const MapProvider = ({ children }) => {
    const [ height, setHeight ] = useState(30);
    const [ width, setWidth ] = useState(50);
    const [ data, setData ] = useState([]);
    const mapRef = useRef();
    const savedCallback = useRef();
    const isDone = useRef(false);

    const resetData = useCallback(() => {
        setData(new Array(height * width).fill(TILE_TYPES.NONE));
    }, [height, width]);

    useEffect(()=> {
        resetData();
    }, [height, resetData, width])

    const toggleTileByIndex = (i) => {
        setData([
            ...data.slice(0, i),
            (data[i] + 1) % Object.keys(TILE_TYPES).length,
            ...data.slice(i + 1)
        ]);
    };

    const runGeneration = useCallback(() => {
        const cloneData = [...data];

        const updateTile = (index, value) => {
            if (Math.random() > .1) return;
            if (index >= 0 && index < cloneData.length && cloneData[index] === 0) cloneData[index] = value; 
        }

        data.forEach((d, i) => {
            if (d > 0) {
                if (i % width !== 0) {
                    updateTile(i - 1, d);
                }
                if ((i + 1) % width !== 0) {
                    updateTile(i + 1, d);
                }
                updateTile(i - width, d);
                updateTile(i + width, d);
            }
        });

        setData(cloneData);
    }, [data, width]);

    useEffect(() => {
        isDone.current = !data.includes(0);
    }, [data]);

    const runUntilDone = () => {
        const run = () => {
            if (!isDone.current) {
                savedCallback.current();
            } else {
                clearInterval(timer);
            }
        };

        const timer = setInterval(run , 100);

        return () => clearInterval(timer);
    };

    useEffect(() => {
        savedCallback.current = runGeneration
    }, [runGeneration]);

    const randomSeeds = () => {
        const cloneData = [...data];
        let randI = Math.floor(Math.random() * cloneData.length);
        cloneData[randI] = 1;
        randI = Math.floor(Math.random() * cloneData.length);
        cloneData[randI] = 2;

        setData(cloneData);
    };

    return (
        <MapContext.Provider value={{
            height, setHeight,
            width, setWidth,
            data,
            toggleTileByIndex,
            resetData,
            runGeneration,
            runUntilDone,
            mapRef,
            randomSeeds
        }}>
            { children }
        </MapContext.Provider>
    );
};