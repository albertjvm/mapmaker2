import React, { useCallback, useEffect, useRef, useState } from "react";

export const MapContext = React.createContext();

const TILE_TYPES = {
    NONE: 0,
    LAND: 1,
    WATER: 2,
    MOUNTAIN: 3,
    FOREST: 4,
    SNOW: 5,
    DESERT: 6,
};

const GENERATION_SPEED = {
    [TILE_TYPES.LAND]: .15,
    [TILE_TYPES.WATER]: .1,
    [TILE_TYPES.MOUNTAIN]: .05,
    [TILE_TYPES.FOREST]: .05,
    [TILE_TYPES.SNOW]: .05,
    [TILE_TYPES.DESERT]: .05,
};

export const MapProvider = ({ children }) => {
    const [ height, setHeight ] = useState(60);
    const [ width, setWidth ] = useState(100);
    const [ data, setData ] = useState([]);
    const mapRef = useRef();
    const savedCallback = useRef();
    const isDone = useRef(false);
    const timer = useRef();

    const resetData = useCallback(() => {
        clearInterval(timer.current);
        setData(new Array(height * width).fill(TILE_TYPES.NONE));
    }, [height, width]);

    useEffect(()=> {
        resetData();
    }, [height, resetData, width])

    const toggleTileByIndex = (i) => {
        setTileByIndex(i, (data[i] + 1) % Object.keys(TILE_TYPES).length);
    };

    const setTileByIndex = (i, value) => {
        setData([
            ...data.slice(0, i),
            value,
            ...data.slice(i + 1)
        ]);
    };

    const runGeneration = useCallback(() => {
        const cloneData = [...data];

        const updateTile = (index, value) => {
            if (Math.random() > GENERATION_SPEED[value]) return;
            if (index >= 0 && index < cloneData.length && cloneData[index] === 0) {
                cloneData[index] = value; 
            }
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
                updateTile(i + parseInt(width), d);
            }
        });

        setData(cloneData);
    }, [data, width]);

    useEffect(() => {
        isDone.current = !data.includes(0);
    }, [data]);

    const runUntilDone = () => {
        if (data.every(d => d === 0)) return;
        
        const run = () => {
            if (!isDone.current) {
                savedCallback.current();
            } else {
                clearInterval(timer);
            }
        };

        timer.current = setInterval(run , 100);

        return () => clearInterval(timer.current);
    };

    useEffect(() => {
        savedCallback.current = runGeneration
    }, [runGeneration]);

    const SEED_TYPES = [
        TILE_TYPES.LAND,
        TILE_TYPES.WATER,
        TILE_TYPES.MOUNTAIN,
        TILE_TYPES.FOREST,
        TILE_TYPES.DESERT,
    ];
    const randomSeeds = () => {
        const cloneData = [...data];

        SEED_TYPES.forEach(type => {
            let randI = Math.floor(Math.random() * cloneData.length);
            cloneData[randI] = cloneData[randI] || type;
        });

        setData(cloneData);
    };

    const addWaterBorderTop = () => {
        const cloneData = [...data];

        [...Array(width).keys()].forEach(i => {
            cloneData[i] = TILE_TYPES.WATER;
        });

        setData(cloneData);
    };

    const addWaterBorderBottom = () => {
        const cloneData = [...data];

        [...Array(width).keys()].forEach(i => {
            cloneData[(height - 1) * width + i] = TILE_TYPES.WATER;
        });

        setData(cloneData);
    };

    const addWaterBorderLeft = () => {
        const cloneData = [...data];

        [...Array(height).keys()].forEach(i => {
            cloneData[i * width] = TILE_TYPES.WATER;
        });

        setData(cloneData);
    };

    const addWaterBorderRight = () => {
        const cloneData = [...data];
        console.log(width);

        [...Array(height).keys()].forEach(i => {
            cloneData[i * width + width - 1] = TILE_TYPES.WATER;
        });

        setData(cloneData);
    };

    return (
        <MapContext.Provider value={{
            height: height, setHeight,
            width: width, setWidth,
            data,
            toggleTileByIndex,
            setTileByIndex,
            resetData,
            runGeneration,
            runUntilDone,
            mapRef,
            randomSeeds,
            addWaterBorderTop,
            addWaterBorderBottom,
            addWaterBorderLeft,
            addWaterBorderRight
        }}>
            { children }
        </MapContext.Provider>
    );
};