import { useContext } from 'react';
import html2canvas from 'html2canvas';
import { MapContext } from '../context/MapContext';
import './Sidebar.scss';

export const Sidebar = () => {
    const { 
        height, setHeight,
         width, setWidth, 
         resetData, 
         runGeneration,
         runUntilDone,
         mapRef
    } = useContext(MapContext);

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
                <input 
                    type="number"
                    value={width}
                    onChange={e => setWidth(parseInt(e.target.value))}
                />
            </div>
            <div className='field'>
                <label>height</label>
                <input 
                    type="number"
                    value={height}
                    onChange={e => setHeight(parseInt(e.target.value))}
                />
            
            </div>
            <label>
                <h4>Instructions:</h4>
                <ul>
                    <li>Click in the grid to seed the generator.</li>
                    <li>Click once for land, twice for water.</li>
                    <li>Then either run one generation at a time if you want to continue to have input as the map fills in.</li>
                    <li>OR click run all and watch the generator do it's work.</li>
                    <li>Export when you're done to download a png</li>
                </ul>
                   
            </label>
            <button onClick={resetData}>reset</button>
            <button onClick={runGeneration}>run generation</button>
            <button onClick={runUntilDone}>run all</button>
            <button onClick={exportImage}>export</button>
        </div>
    );
};