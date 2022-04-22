import { useContext } from 'react';
import { BrushContext } from '../context/BrushContext';
import { MapContext } from '../context/MapContext';
import './Map.scss';
export const Map = () => {
    const { height, width, data, toggleTileByIndex, setTileByIndex, mapRef } = useContext(MapContext);
    const { brush, setCoords } = useContext(BrushContext);

    const handleTileClick = (i) => {
        if (brush === -1) {
            toggleTileByIndex(i);
        } else {
            setTileByIndex(i, brush);
        }
    };

    const handleMouseOver = (e, i) => {
        setCoords(`${Math.floor(i / width)}, ${i % width}`);
        
        if (e.buttons === 1) {
            handleTileClick(i);
        }
    };

    return (
        <div
            className="Map"
            style={{
                gridTemplateColumns: `repeat(${width}, 1fr)`,
                gridTemplateRows: `repeat(${height}, 1fr)`,
            }}
            ref={mapRef}
        >
            {data.map((d, i) => (
                <div 
                    className={`Map-Tile type-${d}`}
                    key={`tile-${i}`}
                    onMouseDown={() => handleTileClick(i)}
                    onMouseOver={e => handleMouseOver(e, i)}
                >

                </div>
            ))}
        </div>
    )
};