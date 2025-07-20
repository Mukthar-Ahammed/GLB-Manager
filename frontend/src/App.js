import Home from "./pages/Home";
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Uploader from "./pages/Uploader";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";


function App() {
  return (
    <div className="App">
      
    <BrowserRouter>
    <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/upload" element={<Uploader/>}/>
      </Routes>
      <Toaster/>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
