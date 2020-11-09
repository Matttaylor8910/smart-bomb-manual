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

  @Input() label?: string;

  @Input() lit = false;
  @Output() litChange = new EventEmitter<boolean>();

  constructor() {}
}
