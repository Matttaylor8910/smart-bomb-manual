import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-number-cluster',
  templateUrl: './number-cluster.component.html',
  styleUrls: ['./number-cluster.component.scss'],
})
export class NumberClusterComponent {
  @Input() selected: number = null;
  @Input() disabled: boolean = false;

  @Output() changed = new EventEmitter<number>();

  options = [1, 2, 3, 4];

  constructor() {}
}
