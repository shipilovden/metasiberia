// src/components/GameScene.tsx

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Plane, Grid, Sky } from '@react-three/drei';
import * as THREE from 'three';
import { DirectionalLightHelper, CameraHelper } from 'three';
import { PlayerData, InputState } from '../generated';
import { Identity } from '@clockworklabs/spacetimedb-sdk';
import { Player } from './Player';
import { TopPanel } from './UI/TopPanel';
import { JoystickControls } from './UI/JoystickControls';
import { applyJoystickInput, resetJoystickInput } from './plugins/joystickPlugin';
import { applyLookInput, resetLookInput } from './plugins/lookPlugin';

// 📦 Камера-контроллер читает lookX/Y из inputRef и вращает камеру
const CameraController: React.FC<{ inputRef: React.MutableRefObject<InputState> }> = ({ inputRef }) => {
  const { camera } = useThree();

  useFrame(() => {
    const look = inputRef.current;
    if (!look) return;

    // Вращаем камеру вокруг Y (горизонтально) и X (наклон)
    camera.rotation.y -= look.lookX * 0.02;
    camera.rotation.x -= look.lookY * 0.02;

    // Ограничим угол наклона камеры вверх/вниз
    camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));

    // Сброс значений после применения
    look.lookX = 0;
    look.lookY = 0;
  });

  return null;
};

interface GameSceneProps {
  players: ReadonlyMap<string, PlayerData>;
  localPlayerIdentity: Identity | null;
  onPlayerRotation?: (rotation: THREE.Euler) => void;
  currentInputRef?: React.MutableRefObject<InputState>;
  isDebugPanelVisible?: boolean;
}

export const GameScene: React.FC<GameSceneProps> = ({
  players,
  localPlayerIdentity,
  onPlayerRotation,
  currentInputRef,
  isDebugPanelVisible = false
}) => {
  const directionalLightRef = useRef<THREE.DirectionalLight>(null!);
  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

  return (
    <>
      <TopPanel />

      {/* 🎮 Mobile-only dual joysticks */}
      {isMobile && currentInputRef && (
        <>
          {/* Left joystick — movement */}
          <div style={{ position: 'absolute', bottom: 30, left: 30, zIndex: 10 }}>
            <JoystickControls
              onMove={(dir) => applyJoystickInput(currentInputRef, dir)}
              onEnd={() => resetJoystickInput(currentInputRef)}
            />
          </div>

          {/* Right joystick — camera rotation */}
          <div style={{ position: 'absolute', bottom: 30, right: 30, zIndex: 10 }}>
            <JoystickControls
              isRotation
              onMove={(dir) => applyLookInput(currentInputRef, dir)}
              onEnd={() => resetLookInput(currentInputRef)}
            />
          </div>
        </>
      )}

      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [0, 10, 20], fov: 60 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
        shadows
      >
        {currentInputRef && <CameraController inputRef={currentInputRef} />}

        <Sky distance={450000} sunPosition={[5, 1, 8]} inclination={0} azimuth={0.25} />
        <ambientLight intensity={0.5} />
        <directionalLight
          ref={directionalLightRef}
          position={[15, 20, 10]}
          intensity={2.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
          shadow-camera-near={0.1}
          shadow-camera-far={100}
        />
        {isDebugPanelVisible && directionalLightRef.current && (
          <>
            <primitive object={new DirectionalLightHelper(directionalLightRef.current, 5)} />
            <primitive object={new CameraHelper(directionalLightRef.current.shadow.camera)} />
          </>
        )}
        <Plane args={[200, 200]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
          <meshStandardMaterial color="#606060" />
        </Plane>
        <Grid
          position={[0, 0, 0]}
          args={[200, 200]}
          cellSize={2}
          cellThickness={1}
          cellColor={new THREE.Color('#888888')}
        />
        {Array.from(players.values()).map((player) => {
          const isLocal = localPlayerIdentity?.toHexString() === player.identity.toHexString();
          return (
            <Player
              key={player.identity.toHexString()}
              playerData={player}
              isLocalPlayer={isLocal}
              onRotationChange={isLocal ? onPlayerRotation : undefined}
              currentInput={isLocal ? currentInputRef?.current : undefined}
              isDebugArrowVisible={isLocal ? isDebugPanelVisible : false}
              isDebugPanelVisible={isDebugPanelVisible}
            />
          );
        })}
      </Canvas>
    </>
  );
};
