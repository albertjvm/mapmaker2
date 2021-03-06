import { useContext } from 'react';
import { TILE_TYPES, SPEEDS, MapContext } from '../context/MapContext';
import { BRUSHES, BrushContext } from '../context/BrushContext';
import './Sidebar.scss';
import { TextInput } from './TextInput';
import { Panel } from './Panel';
import { Slider } from './Slider';

const maxW = 2000;
const maxH = 1200;

export const Sidebar = () => {
    const { 
        height, setHeight,
        width, setWidth, 
        resetData, 
        runGeneration,
        runUntilDone,
        stopGeneration,
        mapRef,
        randomSeeds,
        addBorderTop,
        addBorderBottom,
        addBorderLeft,
        addBorderRight,
        weights, updateWeight,
        seeds, updateSeed
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

            <Panel title="Add Border">
                <div className='grid4'>
                    {[
                        TILE_TYPES.LAND,
                        TILE_TYPES.WATER,
                        TILE_TYPES.SNOW,
                    ].map(type => (
                        <>
                            <button key={`bt-${type}`} className={`button-${type}`} onClick={() => addBorderTop(type)}>top</button>
                            <button key={`br-${type}`} className={`button-${type}`} onClick={() => addBorderRight(type)}>right</button>
                            <button key={`bb-${type}`} className={`button-${type}`} onClick={() => addBorderBottom(type)}>bottom</button>
                            <button key={`bl-${type}`} className={`button-${type}`} onClick={() => addBorderLeft(type)}>left</button>
                        </>
                    ))}
                </div>
            </Panel>

            <Panel title="Generate">
                <div className='column'>
                    {Object.values(TILE_TYPES).slice(1).map(type => (
                        <div className='row' key={`generate-${type}`}>
                            <span className={`tile tile-${type}`} />
                            <Slider
                                options={SPEEDS.map((s, i) => ({name: i+1, value: s}))}
                                valueKey='value'
                                displayKey='name'
                                value={weights[type]}
                                onChange={v => updateWeight(type, v)} 
                            />
                        </div>
                    ))}
                    <button onClick={runGeneration}>run generation</button>
                    <button onClick={runUntilDone}>run all</button>
                    <button onClick={stopGeneration}>stop</button>
                </div>
            </Panel>

            <Panel title="Seeds">
                <div className='seeds grid2'>
                    {Object.values(TILE_TYPES).slice(1).map(type => (
                        <div className='row' key={`seed-${type}`}>
                            <button className={`button-${type}`} onClick={() => updateSeed(type, seeds[type] - 1)}>-</button>
                            <span>{seeds[type]}</span>
                            <button className={`button-${type}`} onClick={() => updateSeed(type, seeds[type] + 1)}>+</button>
                        </div>
                    ))}
                    <button onClick={randomSeeds}>random seeds</button>
                </div>
            </Panel>

            
            <Panel>
                <div className='column'>
                    <button onClick={resetData}>reset</button>
                </div>
            </Panel>

            <Panel>
                <div className='column'>
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