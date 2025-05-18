// src/components/UI/JoystickControls.tsx
import React, { useEffect, useRef } from 'react';
import nipplejs from 'nipplejs';

interface JoystickControlsProps {
  onMove?: (direction: any) => void;
  onEnd?: () => void;
  isRotation?: boolean;
}

export const JoystickControls: React.FC<JoystickControlsProps> = ({
  onMove,
  onEnd,
  isRotation = false,
}) => {
  const joystickRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!joystickRef.current) return;

    const manager = nipplejs.create({
      zone: joystickRef.current,
      mode: 'static',
      position: { left: '50%', top: '50%' },
      color: 'white',
      size: 100,
      restOpacity: 0.5,
    });

    manager.on('move', (_, data) => {
      if (!data || !onMove) return;

      if (isRotation) {
        // Для вращения — отправляем угол (в градусах) и силу
        const angle = data.angle?.degree ?? 0;
        const force = data.force ?? 0;
        onMove({ angle, force });
      } else {
        // Для движения — булево направление
        const angle = data.angle?.degree ?? 0;
        const direction = {
          forward: angle >= 45 && angle <= 135,
          backward: angle >= 225 && angle <= 315,
          left: angle > 135 && angle < 225,
          right: angle <= 45 || angle >= 315,
        };
        onMove(direction);
      }
    });

    manager.on('end', () => {
      onEnd?.();
    });

    return () => {
      manager.destroy();
    };
  }, [onMove, onEnd, isRotation]);

  return (
    <div
      ref={joystickRef}
      style={{
        width: 120,
        height: 120,
        borderRadius: '50%',
        backgroundColor: 'transparent',
        position: 'relative',
      }}
    />
  );
};
