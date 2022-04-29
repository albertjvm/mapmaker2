import { useContext, useEffect } from 'react';
import { BrushContext } from '../context/BrushContext';
import { MapContext } from '../context/MapContext';
import './Map.scss';

const COLOR_DATA = [
    [205, 205, 205],
    [0, 116, 25],
    [49, 94, 215],
    [98, 117, 132],
    [0, 89, 19],
    [255, 249, 249],
    [236, 228, 165],
];

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

    const handleCanvasClick = (e) => {
        const { x, y } = getMousePos(mapRef.current, e);

        handleTileClick(y * width + x);
    };

    const getMousePos = (canvas, e) => {
        let mouseX, mouseY;
        if(e.type.startsWith('touch')) {
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            mouseX = touch.pageX;
            mouseY = touch.pageY;
        } else if (e.type.startsWith('mouse')) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = Math.floor((mouseX - rect.left) * scaleX);
        const y = Math.floor((mouseY - rect.top) * scaleY);

        return {x, y};
    };

    const handleMouseOver = (e) => {
        const { x, y } = getMousePos(mapRef.current, e);

        setCoords(`${x}, ${y}`);

        if (e.buttons === 1) {
            handleCanvasClick(e);
        }
    };

    useEffect(() => {
        const canvas = mapRef.current;
        const context = canvas.getContext('2d');

        const imageData = context.createImageData(width, height);
        data.forEach((d, i) => {
            const off = i * 4;
            imageData.data[off] = COLOR_DATA[d][0];
            imageData.data[off + 1] = COLOR_DATA[d][1];
            imageData.data[off + 2] = COLOR_DATA[d][2];
            imageData.data[off + 3] = 255;
        });

        context.putImageData(imageData, 0, 0);
    }, [data, height, mapRef, width]);

    return (
        <div className='Map'>
            <canvas 
                ref={mapRef} 
                height={height} 
                width={width} 
                onMouseMove={handleMouseOver} 
                onTouchMove={handleCanvasClick}
                onClick={handleCanvasClick}
            />
        </div>
    )
};