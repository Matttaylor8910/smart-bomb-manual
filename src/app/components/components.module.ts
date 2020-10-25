import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ComplicatedWiresComponent} from './complicated-wires/complicated-wires.component';

@NgModule({
  declarations: [
    ComplicatedWiresComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
  exports: [
    ComplicatedWiresComponent,
  ]
})
export class ComponentsModule {
}
