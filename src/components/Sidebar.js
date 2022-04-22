import { useContext } from 'react';
import html2canvas from 'html2canvas';
import { MapContext } from '../context/MapContext';
import { BRUSHES, BrushContext } from '../context/BrushContext';
import './Sidebar.scss';
import { TextInput } from './TextInput';

export const Sidebar = () => {
    const { 
        height, setHeight,
         width, setWidth, 
         resetData, 
         runGeneration,
         runUntilDone,
         mapRef,
         randomSeeds,
         addWaterBorderTop,
         addWaterBorderBottom,
         addWaterBorderLeft,
         addWaterBorderRight
    } = useContext(MapContext);

    const { brush, setBrush, coords } = useContext(BrushContext);

    const exportImage = async () => {
        const canvas = await html2canvas(mapRef.current);
  
        const data = canvas.toDataURL('image/png');
        const link = document.createElement('a');
    
        if (typeof link.download === 'string') {
            link.href = data;
            link.download = `map.png`;
    
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            window.open(data);
        }
    };

    return (
        <div className="Sidebar">
            <div className='field'>
                <label>width</label>
                <TextInput 
                    type="number"
                    value={width}
                    min="10"
                    max="200"
                    onChange={v => setWidth(Math.min(Math.max(v || 10, 10), 200))}
                />
            </div>
            <div className='field'>
                <label>height</label>
                <TextInput 
                    type="number"
                    value={height}
                    min="10"
                    max="100"
                    onChange={v => setHeight(Math.min(Math.max(v || 10, 10), 100))}
                />
            
            </div>

            <div className='Brushes'>
                <label>Brushes</label>
                {Object.values(BRUSHES).map(b => (
                    <button 
                    key={`brush-${b}`}
                        className={`brush-${b} ${brush === b ? 'active' : ''}`} 
                        onClick={() => setBrush(b)}
                    />
                ))}
            </div>

            <div className='Borders'>
                <label>Add Water Border</label>
                <button onClick={addWaterBorderTop}>top</button>
                <button onClick={addWaterBorderRight}>right</button>
                <button onClick={addWaterBorderBottom}>bottom</button>
                <button onClick={addWaterBorderLeft}>left</button>
            </div>

            <label>
                <h4>Instructions:</h4>
                <ol>
                    <li>Seed the map generator by clicking 'random seeds' a few times or by clicking in the grid. (Click once for land, twice for water)</li>
                    <li>Either run one generation at a time if you want to continue to have input as the map fills in OR click run all and watch the generator do it's work.</li>
                    <li>Export when you're done to download a png</li>
                </ol>
                   
            </label>
            <button onClick={randomSeeds}>random seeds</button>
            <button onClick={resetData}>reset</button>
            <button onClick={runGeneration}>run generation</button>
            <button onClick={runUntilDone}>run all</button>
            <button onClick={exportImage}>export</button>

            <span>{coords}</span>
        </div>
    );
};