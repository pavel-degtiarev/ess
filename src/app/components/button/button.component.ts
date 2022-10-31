import { Component, Input, OnInit } from '@angular/core';
import { BUTTON, IButton } from 'src/app/interfaces/button.interface';
import { IControl } from 'src/app/interfaces/control.interface';

const auxClass = {
  [BUTTON.SAVE]: 'button__save',
  [BUTTON.EDIT]: 'button__edit',
  [BUTTON.DELETE]: 'button__delete',
  [BUTTON.CANCEL]: 'button__cancel',
};

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit, IButton {
  @Input() button: IControl;

  classes: string[] = ['button'];

  ngOnInit(): void {
    this.classes.push(auxClass[this.button.type]);
  }
}
