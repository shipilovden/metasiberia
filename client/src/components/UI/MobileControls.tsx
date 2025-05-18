// src/components/UI/MobileControls.tsx
import React from 'react';
import { JoystickControls } from './JoystickControls';
import { applyJoystickInput, resetJoystickInput } from '../plugins/joystickPlugin';
import { applyLookInput, resetLookInput } from '../plugins/lookPlugin';
import type { InputState } from '../../generated';

interface MobileControlsProps {
  inputRef: React.MutableRefObject<InputState>;
}

export const MobileControls: React.FC<MobileControlsProps> = ({ inputRef }) => {
  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
  if (!isMobile) return null;

  return (
    <>
      {/* Левый джойстик — движение */}
      <div style={{ position: 'absolute', bottom: 30, left: 30, zIndex: 10 }}>
        <JoystickControls
          onMove={(dir) => applyJoystickInput(inputRef, dir)}
          onEnd={() => resetJoystickInput(inputRef)}
        />
      </div>

      {/* Правый джойстик — вращение камеры */}
      <div style={{ position: 'absolute', bottom: 30, right: 30, zIndex: 10 }}>
        <JoystickControls
          isRotation={true}
          onMove={(dir) => applyLookInput(inputRef, dir)}
          onEnd={() => resetLookInput(inputRef)}
        />
      </div>
    </>
  );
};
