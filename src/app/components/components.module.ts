import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ComplicatedWiresComponent} from './complicated-wires/complicated-wires.component';
import {ModuleWindowComponent} from './module-window/module-window.component';
import {PasswordsComponent} from './passwords/passwords.component';

@NgModule({
  declarations: [
    ModuleWindowComponent,
    ComplicatedWiresComponent,
    PasswordsComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
  exports: [
    ModuleWindowComponent,
    ComplicatedWiresComponent,
    PasswordsComponent,
  ]
})
export class ComponentsModule {
}
