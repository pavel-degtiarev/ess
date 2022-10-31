import { TButton } from 'src/app/interfaces/button.interface';

export interface IControl {
  type: TButton;
  handler: () => void;
}
