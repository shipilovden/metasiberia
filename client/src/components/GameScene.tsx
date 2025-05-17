/**
 * GameScene.tsx
 * 
 * Core component that manages the 3D multiplayer game environment:
 * 
 * Key functionality:
 * - Acts as the primary container for all 3D game elements
 * - Manages the game world environment (terrain, lighting, physics)
 * - Instantiates and coordinates player entities
 * - Handles multiplayer synchronization across clients
 * - Manages game state and lifecycle (start, join, disconnect)
 * - Maintains socket connections for real-time gameplay
 * 
 * Props:
 * - username: The local player's display name
 * - playerClass: The selected character class for the local player
 * - roomId: Unique identifier for the multiplayer game session
 * - onDisconnect: Callback function when player disconnects from game
 * 
 * Technical implementation:
 * - Uses React Three Fiber (R3F) for 3D rendering within React
 * - Implements physics system with Rapier for realistic interactions
 * - Manages socket.io connections for multiplayer state synchronization
 * - Handles dynamic loading and instantiation of 3D assets
 * 
 * Related files:
 * - Player.tsx: Individual player entity component
 * - JoinGameDialog.tsx: UI for joining a game session
 * - PlayerUI.tsx: In-game user interface elements
 * - Socket handlers for network communication
 */

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Box, Plane, Grid, Sky } from '@react-three/drei';
import * as THREE from 'three';
import { DirectionalLightHelper, CameraHelper } from 'three';
import { PlayerData, InputState } from '../generated';
import { Identity } from '@clockworklabs/spacetimedb-sdk';
import { Player } from './Player';
import { TopPanel } from './UI/TopPanel';

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

  return (
    <>
      <TopPanel />
      <Canvas 
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [0, 10, 20], fov: 60 }} 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} 
        shadows
      >
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
        <Plane 
          args={[200, 200]} 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -0.001, 0]} 
          receiveShadow={true} 
        >
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
