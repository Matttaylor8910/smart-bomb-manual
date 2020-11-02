import {literal} from '@angular/compiler/src/output/output_ast';
import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-led',
  templateUrl: './led.component.html',
  styleUrls: ['./led.component.scss'],
})
export class LedComponent {
  get state(): boolean {
    return this.lit ?? false;
  }
  set state(value: boolean) {
    this.litChange.emit(value);
  }

  @Input() lit = false;
  @Output() litChange = new EventEmitter<boolean>();

  constructor() {}
}
