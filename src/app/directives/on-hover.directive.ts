import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnHover]',
})
export class OnHoverDirective {
  @Input('appOnHover') handler: (isHovered: boolean) => void;

  @HostListener('mouseenter') onEnter() {
    this.handler(true);
  }

  @HostListener('mouseleave') onLeave() {
    this.handler(false);
  }
}

