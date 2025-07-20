import React, { useEffect, useState } from 'react';
import { Suspense } from 'react';
import GLBmain from '../components/GLBmain';
import axios from 'axios';
import './Home.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CanvasLoader from '../components/CanvasLoader.js'; 


function Home() {
  const [files, setFile] = useState([]);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const res = await axios.get('https://glb-manager-backend.onrender.com/View');
        setFile(res.data);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    };
    fetchModel();
  }, []);

  return (
    <div className='Homemain'>
      {files.length > 0 ? (
        files.map(file => (
          <div className='canvas-wrapper' key={file._id}>
            <Canvas camera={{ position: [0, 0, 2] }}>
              <ambientLight />
              <directionalLight position={[2, 2, 2]} />
              <Suspense fallback={<CanvasLoader />}>

                <GLBmain url={`http://localhost:1000/view/${file.fileId}`} />
              </Suspense>
              <OrbitControls />
            </Canvas>
            <p className="model-name">{file.name}</p>
          </div>
        ))
      ) : (
        <p>No 3D models found</p>
      )}
    </div>
  );
}

export default Home;
