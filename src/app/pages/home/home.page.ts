import {Component} from '@angular/core';
import {Modules, ModuleService} from 'src/app/services/module.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  loadedModules = [];

  constructor(
      public readonly moduleService: ModuleService,
  ) {}

  get moduleNames(): string[] {
    return Object.values(Modules);
  }
}
