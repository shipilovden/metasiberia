// src/plugins/joystickPlugin.ts
// Update the import path below to the correct location of InputState, for example:
import { InputState } from '../../generated';
// Or, if you need to create a type definition temporarily:
export type InputState = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  sequence: number;
};

export function applyJoystickInput(
  inputRef: React.MutableRefObject<InputState>,
  direction: { forward: boolean; backward: boolean; left: boolean; right: boolean }
) {
  inputRef.current.forward = direction.forward;
  inputRef.current.backward = direction.backward;
  inputRef.current.left = direction.left;
  inputRef.current.right = direction.right;
  inputRef.current.sequence += 1;
}

export function resetJoystickInput(inputRef: React.MutableRefObject<InputState>) {
  inputRef.current.forward = false;
  inputRef.current.backward = false;
  inputRef.current.left = false;
  inputRef.current.right = false;
  inputRef.current.sequence += 1;
}
