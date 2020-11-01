import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Modules} from 'src/app/services/module.service';

@Component({
  selector: 'app-module-window',
  templateUrl: './module-window.component.html',
  styleUrls: ['./module-window.component.scss'],
})
export class ModuleWindowComponent {
  @Input() module: string;
  @Output() reloaded = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  Modules = Modules;

  constructor() {}
}
