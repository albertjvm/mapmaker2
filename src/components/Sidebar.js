import { useContext } from 'react';
import html2canvas from 'html2canvas';
import { MapContext } from '../context/MapContext';
import { BRUSHES, BrushContext } from '../context/BrushContext';
import './Sidebar.scss';
import { TextInput } from './TextInput';
import { Panel } from './Panel';

const maxW = 2000;
const maxH = 1200;

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
        const canvas = mapRef.current;
  
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
            <Panel title="Map size">
                <div className='field'>
                    <label>width</label>
                    <TextInput 
                        type="number"
                        value={width}
                        min="10"
                        max="200"
                        onChange={v => setWidth(Math.min(Math.max(v || 10, 10), maxW))}
                        // onChange={v => setWidth(parseInt(v) || 10)}
                    />
                </div>
                <div className='field'>
                    <label>height</label>
                    <TextInput 
                        type="number"
                        value={height}
                        min="10"
                        max="100"
                        onChange={v => setHeight(Math.min(Math.max(v || 10, 10), maxH))}
                        // onChange={v => setHeight(parseInt(v) || 10)}
                    />
                
                </div>
            </Panel>

            <Panel title='Brushes'>
                <div className='grid4'>
                    {Object.values(BRUSHES).map(b => (
                        <button 
                            key={`brush-${b}`}
                            className={`Brush brush-${b} ${brush === b ? 'active' : ''}`} 
                            onClick={() => setBrush(b)}
                        />
                    ))}
                </div>
            </Panel>

            <Panel title="Add Water Border">
                <div className='grid4'>
                    <button onClick={addWaterBorderTop}>top</button>
                    <button onClick={addWaterBorderRight}>right</button>
                    <button onClick={addWaterBorderBottom}>bottom</button>
                    <button onClick={addWaterBorderLeft}>left</button>
                </div>
            </Panel>

            <Panel title="Commands">
                <div className='column'>
                    <button onClick={randomSeeds}>random seeds</button>
                    <button onClick={resetData}>reset</button>
                    <button onClick={runGeneration}>run generation</button>
                    <button onClick={runUntilDone}>run all</button>
                    <button onClick={exportImage}>export</button>
                </div>
            </Panel>

            <Panel title="Mouse coords">{coords}</Panel>

            <Panel title="Quick start">
                <ol>
                    <li>Click 'random seeds' a few times.</li>
                    <li>Click 'run all'.</li>
                    <li>Export to download a png</li>
                </ol>
                   
            </Panel>
        </div>
    );
};