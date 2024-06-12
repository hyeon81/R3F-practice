import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

/**
 * useFrame: 3D 모델을 프레임 단위로 업데이트할 수 있는 함수
 */

const MyElement3D = () => {
  const refMesh = useRef();

  useFrame((state, delta) => {
    refMesh.current.rotation.z += delta;
  });
  /**
   * mesh: 3D 모델을 렌더링할 수 있는 요소  (rotation: x,y,z축에 대한 각도, radian으로 표현)
   * boxGeometry: 3D 박스 모델을 생성할 수 있는 요소
   * meshStandardMaterial: 3D 모델의 색상과 질감을 설정할 수 있는 요소
   * directionalLight: 빛을 방향에 따라 조절할 수 있는 요소
   * axesHelper: 3D 모델의 축을 표시할 수 있는 요소 (x: red, y: green, z: blue)
   * OrbitControls: 3D 모델을 마우스로 회전 및 확대/축소할 수 있는 요소
   */

  return (
    <>
      <directionalLight position={[1, 1, 1]} />
      <axesHelper scale={10} />
      <OrbitControls />
      <mesh
        ref={refMesh}
        position={[0, 2, 0]}
        rotation-z={THREE.MathUtils.degToRad(45)}
        scale={[2, 1, 1]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="#e67e22"
          transparent={true}
          opacity={0.5}
        />
        {/*로컬 좌표계*/}
        <axesHelper />
        <mesh scale={[0.1, 0.1, 0.1]} position-y={2}>
          {/*부모 요소의 로컬 좌표계를 기준으로 위치를 설정*/}
          <sphereGeometry />
          <meshStandardMaterial color="red" />
          <axesHelper scale={5} />
        </mesh>
      </mesh>
    </>
  );
};

export default MyElement3D;
