import './App.css';
import { Map, Sidebar } from './components';
import { BrushProvider } from './context/BrushContext';
import { MapProvider } from './context/MapContext';

function App() {
  return (
    <BrushProvider>
      <MapProvider>
        <div className="App">
          <Map />
          <Sidebar />
        </div>
      </MapProvider>
    </BrushProvider>
  );
}

export default App;
