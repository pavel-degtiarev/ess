import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BUTTON, TButton } from 'src/app/interfaces/button.interface';
import { IControl } from 'src/app/interfaces/control.interface';
import { IState, TState, STATE } from '../../interfaces/state.interface';

// каждому состоянию записи user соответствует свой набор кнопок
const controlStates = {
  [STATE.ACTIVE]: [BUTTON.EDIT, BUTTON.DELETE],
  [STATE.EDIT]: [BUTTON.SAVE, BUTTON.CANCEL, BUTTON.DELETE],
  [STATE.ADD]: [BUTTON.SAVE, BUTTON.CANCEL],
};

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent implements OnChanges, IState {
  @Input() state: TState;
  @Input() handlers: { [key in TButton]: () => void };

  buttons: IControl[] = [];

  // если текущее состояние записи STATE.IDLE, убираем все кнопки,
  // иначе добавляем соответствующий состоянию набор
  ngOnChanges(changes: SimpleChanges): void {
    const newState: TState = changes.state.currentValue;

    if (newState === STATE.IDLE) {
      this.buttons = [] as IControl[];
      return;
    }

    this.buttons = controlStates[newState].map(
      (buttonType): IControl => ({
        type: buttonType,
        handler: this.handlers[buttonType],
      })
    );
  }
}
