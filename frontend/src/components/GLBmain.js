import React from 'react';
import { useGLTF } from '@react-three/drei';

function GLBmain({ url }) {
  const { scene } = useGLTF(url);

  return <primitive object={scene} />;
}

export default GLBmain;
