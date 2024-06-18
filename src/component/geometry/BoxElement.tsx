import { useEffect, useRef } from "react";
import { Box, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

const BoxElement = () => {
  // Drei: R3F에서 사용할 수 있는 유용한 컴포넌트들을 제공하는 라이브러리
  const refMesh = useRef();
  const refWireMesh = useRef();

  // useControls: 레바(Leva) 라이브러리를 사용하여 컨트롤러를 생성할 수 있는 함수
  const { xSize, ySize, zSize, xSeg, ySeg, zSeg } = useControls({
    xSize: {
      value: 1,
      min: 0.1,
      max: 5,
      step: 0.01,
    },
    ySize: {
      value: 1,
      min: 0.1,
      max: 5,
      step: 0.01,
    },
    zSize: {
      value: 1,
      min: 0.1,
      max: 5,
      step: 0.01,
    },
    xSeg: {
      //Seg값은 정수여야
      value: 1,
      min: 1,
      max: 10,
      step: 1,
    },
    ySeg: {
      value: 1,
      min: 1,
      max: 10,
      step: 1,
    },
    zSeg: {
      value: 1,
      min: 1,
      max: 10,
      step: 1,
    },
  });
  useEffect(() => {
    //gemoetry: 3D 모델의 기하학적 구조를 정의하는 요소
    //ref를 통해 geometry를 참조할 수 있음 (중복으로 인한 메모리 낭비 방지)
    refWireMesh.current.geometry = refMesh.current.geometry;
  }, [xSize, ySize, zSize, xSeg, ySeg, zSeg]);
  return (
    <>
      <OrbitControls />
      <directionalLight position={[1, 1, 1]} />
      <axesHelper scale={10} />
      <mesh ref={refMesh}>
        {/*args: 3D 모델의 크기를 설정할 수 있는 속성, 6개의 값, 기본 값 1*/}
        <boxGeometry args={[xSize, ySize, zSize, xSeg, ySeg, zSeg]} />
        <meshStandardMaterial color="#e67e22" />
      </mesh>
      <mesh ref={refWireMesh}>
        {/*emissive란? 빛을 반사하는 것이 아니라 빛을 내는 것*/}
        {/*wireframe이란? 3D 모델의 외곽선을 표시*/}
        <meshStandardMaterial emissive="yellow" wireframe />
      </mesh>
    </>
  );
};

export default BoxElement;
