import React from 'react'
import { useGLTF } from '@react-three/drei';


function GLBViewer({url}) {

   const { scene } = useGLTF(url);
   return <primitive object={scene} />;
   
}

export default GLBViewer
