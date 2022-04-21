import './App.css';
import { Map, Sidebar } from './components';
import { MapProvider } from './context/MapContext';

function App() {
  return (
    <MapProvider>
      <div className="App">
        <Map />
        <Sidebar />
      </div>
    </MapProvider>
  );
}

export default App;
