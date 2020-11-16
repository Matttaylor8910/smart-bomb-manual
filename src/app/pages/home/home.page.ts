import {Component} from '@angular/core';
import {ModuleName, ModuleService} from 'src/app/services/module.service';

interface HomeTab {
  label: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  tabs: HomeTab[] = [
    {label: 'Modules', icon: 'browsers'},
    {label: 'Bomb State', icon: 'settings'},
  ];

  selectedTab: HomeTab;
  loadedModules = [];

  constructor(
      public readonly moduleService: ModuleService,
  ) {
    this.selectTab(this.tabs[0]);
  }

  get moduleNames(): string[] {
    return Object.values(ModuleName);
  }

  get showModules(): boolean {
    return this.selectedTab === this.tabs[0];
  }

  selectTab(tab: HomeTab) {
    this.selectedTab = tab;
  }
}
