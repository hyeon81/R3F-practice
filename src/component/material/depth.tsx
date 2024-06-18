import { useEffect, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";

/**
 * useFrame: 3D 모델을 프레임 단위로 업데이트할 수 있는 함수
 */

const MyElement3D = () => {
  const mesh1 = useRef();
  const mesh2 = useRef();

  useEffect(() => {
    // mesh1의 material을 mesh2의 material로 설정
    mesh2.current.material = mesh1.current.material;
  }, []);

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 1, 0]} />
      <directionalLight position={[1, 2, 8]} intensity={0.7} />
      <mesh position={[0.7, 0, 0]} ref={mesh1}>
        <torusKnotGeometry args={[0.5, 0.2, 100, 16]} />
        <meshDepthMaterial />
      </mesh>
      <mesh position={[-0.7, 0, 0]} ref={mesh2}>
        <torusGeometry args={[0.5, 0.2]} />
      </mesh>
    </>
  );
};

export default MyElement3D;
