
export enum STATE {
  IDLE = 'idle',
  ACTIVE = 'active',
  EDIT = 'edit',
  ADD = 'add',
}

export type TState = STATE.IDLE | STATE.ACTIVE | STATE.EDIT | STATE.ADD;

export interface IState {
  state: TState;
}
