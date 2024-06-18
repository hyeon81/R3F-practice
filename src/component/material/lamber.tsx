import { useEffect, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

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
        <boxGeometry />
        <meshLambertMaterial
          color={"#d25383"}
          wireframe={false} //와이어프레임 마냥 뼈대로 보여줌
          visible //렌더링여부
          transparent={false} //재질에 대한 투명도 설정
          opacity={1} //투명도. transparent가 true일 때만 작동
          depthTest //depthBuffer에 대한 테스트
          depthWrite //z값을 depthBuffer에 쓰는지 여부
          side={THREE.DoubleSide} //앞면만 렌더링할지, 혹은 뒷면만 렌더링할지 등... (기본값 THREE.FrontSide)
          emissive={0x666600} //발광색
        />
      </mesh>
      <mesh position={[-0.7, 0, 0]} ref={mesh2}>
        <torusGeometry args={[0.5, 0.2]} />
      </mesh>
    </>
  );
};

export default MyElement3D;
