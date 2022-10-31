import { Component } from '@angular/core';
import { InformerService } from 'src/app/services/informer.service';

@Component({
  selector: 'app-informer',
  templateUrl: './informer.component.html',
  styleUrls: ['./informer.component.scss'],
})
export class InformerComponent {
  constructor(public informerService: InformerService) {}
}
