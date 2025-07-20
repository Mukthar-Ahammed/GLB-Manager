import './Navbar.css'
import {Box} from 'lucide-react'
import { Link } from 'react-router-dom'



const Navbar = () => {
  return (
    <div className='main'>
        <div className='first'>
            <Link to="/"><Box className='logo'/></Link>
        </div>
        <div className='second'>
             <Link to="/upload"><button>Upload</button></Link>
        </div>
    </div>
  )
}

export default Navbar
