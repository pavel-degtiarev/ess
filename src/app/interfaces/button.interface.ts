import { IControl } from "./control.interface";

export enum BUTTON {
  EDIT = 'edit',
  SAVE = 'save',
  CANCEL = 'cancel',
  DELETE = 'delete',
}

export type TButton =
  | BUTTON.EDIT
  | BUTTON.SAVE
  | BUTTON.CANCEL
  | BUTTON.DELETE;

export interface IButton {
  button: IControl;
}
