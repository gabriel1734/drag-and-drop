import './App.css';
import { DragNDrop } from './components/DragNDrop';

import * as dataDrop from './components/Mock/DragNDrop';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="drag-n-drop">
          <DragNDrop data={dataDrop} />
        </div>
      </header>
    </div>
  );
}

export default App;
