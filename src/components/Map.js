import { useContext } from 'react';
import { MapContext } from '../context/MapContext';
import './Map.scss';
export const Map = () => {
    const { height, width, data, toggleTileByIndex, mapRef } = useContext(MapContext);

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
                    onClick={() => toggleTileByIndex(i)}
                >

                </div>
            ))}
        </div>
    )
};