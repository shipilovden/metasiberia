// src/components/plugins/lookPlugin.ts
import type { InputState } from '../../generated';

export function applyLookInput(
  inputRef: React.MutableRefObject<InputState>,
  dir: { angle: number; force: number }
) {
  const input = inputRef.current;
  if (!input) return;

  const sensitivity = 0.03; // чувствительность вращения камеры
  const radians = (dir.angle * Math.PI) / 180;

  // Простой вариант: использовать синус/косинус для вращения по горизонтали (ось X — вперёд-назад, ось Y — вбок)
  input.lookX = Math.cos(radians) * dir.force * sensitivity;
  input.lookY = Math.sin(radians) * dir.force * sensitivity;
}

export function resetLookInput(inputRef: React.MutableRefObject<InputState>) {
  const input = inputRef.current;
  if (!input) return;

  input.lookX = 0;
  input.lookY = 0;
}
