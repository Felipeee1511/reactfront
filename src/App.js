import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ShowDevices from './components/ShowDevices';
import CreateDevice from './components/CreateDevice';
import EditDevice from './components/EditDevice';
import NavMenu from './components/NavMenu';
import Welcome from './components/Welcome';

function App() {
  return (
    <div className="App">

        


        <BrowserRouter>
          <NavMenu/>
          <Routes>
          <Route exact path="/" element={<Navigate replace to="/Welcome" />} />
          <Route path="/Welcome" element={<Welcome />} />
          <Route path="/showDevices" element={<ShowDevices/>}/> 
          <Route path="/create" element={<CreateDevice />}/>
          <Route path="/edit/:id" element={<EditDevice />}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
