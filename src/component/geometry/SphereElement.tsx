import { useEffect, useRef } from "react";
import { Box, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

const SphereElement = () => {
  // Drei: R3F에서 사용할 수 있는 유용한 컴포넌트들을 제공하는 라이브러리
  const refMesh = useRef();
  const refWireMesh = useRef();

  // useControls: 레바(Leva) 라이브러리를 사용하여 컨트롤러를 생성할 수 있는 함수
  // radius = 구의 크기 조절
  const {
    radius,
    widthSeg,
    heightSeg,
    phiStart,
    phiLength,
    thetaLength,
    thetaStart,
  } = useControls({
    radius: {
      value: 1,
      min: 0.1,
      max: 5,
      step: 0.01,
    },
    //값은 정수여야
    widthSeg: {
      value: 32,
      min: 3,
      max: 256,
      step: 1,
    },
    heightSeg: {
      value: 32,
      min: 3,
      max: 256,
      step: 1,
    },
    phiStart: {
      value: 0,
      min: 0,
      max: 360,
      step: 0.1,
    },
    phiLength: {
      value: 360,
      min: 0,
      max: 360,
      step: 0.1,
    },
    thetaStart: {
      value: 0,
      min: 0,
      max: 180,
      step: 0.1,
    },
    thetaLength: {
      value: 180,
      min: 0,
      max: 180,
      step: 0.1,
    },
  });
  useEffect(() => {
    //gemoetry: 3D 모델의 기하학적 구조를 정의하는 요소
    //ref를 통해 geometry를 참조할 수 있음 (중복으로 인한 메모리 낭비 방지)
    refWireMesh.current.geometry = refMesh.current.geometry;
  }, [radius, widthSeg, heightSeg]);
  return (
    <>
      <OrbitControls />
      <directionalLight position={[1, 1, 1]} />
      <axesHelper scale={10} />
      <mesh ref={refMesh}>
        {/*args: 각 지오메트리를 위한 클래스의 생성자에 대한 인자, size는 크기, seg는 분할 수, 기본 값 1*/}
        <sphereGeometry
          args={[
            radius,
            widthSeg,
            heightSeg,
            (phiStart * Math.PI) / 180, //라디안 값으로 변환
            (phiLength * Math.PI) / 180,
            (thetaStart * Math.PI) / 180,
            (thetaLength * Math.PI) / 180,
          ]}
        />
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

export default SphereElement;
