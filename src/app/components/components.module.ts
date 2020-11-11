import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TooltipModule} from 'ng2-tooltip-directive';

import {BombStateComponent} from './bomb-state/bomb-state.component';
import {ComplicatedWiresComponent} from './complicated-wires/complicated-wires.component';
import {KeypadsComponent} from './keypads/keypads.component';
import {KnobsComponent} from './knobs/knobs.component';
import {LedComponent} from './led/led.component';
import {MazesComponent} from './mazes/mazes.component';
import {MemoryComponent} from './memory/memory.component';
import {ModuleWindowComponent} from './module-window/module-window.component';
import {MorseCodeComponent} from './morse-code/morse-code.component';
import {NumberClusterComponent} from './number-cluster/number-cluster.component';
import {PasswordsComponent} from './passwords/passwords.component';
import {SimonSaysComponent} from './simon-says/simon-says.component';
import {TheButtonComponent} from './the-button/the-button.component';
import {WhosOnFirstComponent} from './whos-on-first/whos-on-first.component';
import {WireSequencesComponent} from './wire-sequences/wire-sequences.component';
import {WiresComponent} from './wires/wires.component';

@NgModule({
  declarations: [
    BombStateComponent,
    ComplicatedWiresComponent,
    KeypadsComponent,
    KnobsComponent,
    LedComponent,
    MazesComponent,
    MemoryComponent,
    ModuleWindowComponent,
    MorseCodeComponent,
    NumberClusterComponent,
    PasswordsComponent,
    SimonSaysComponent,
    TheButtonComponent,
    WhosOnFirstComponent,
    WiresComponent,
    WireSequencesComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TooltipModule.forRoot({
      'placement': 'bottom',
      'hide-delay': 0,
      'displayTouchscreen': false,
    }),
  ],
  exports: [
    BombStateComponent,
    ComplicatedWiresComponent,
    KeypadsComponent,
    KnobsComponent,
    LedComponent,
    MazesComponent,
    MemoryComponent,
    ModuleWindowComponent,
    MorseCodeComponent,
    NumberClusterComponent,
    PasswordsComponent,
    SimonSaysComponent,
    TheButtonComponent,
    WhosOnFirstComponent,
    WiresComponent,
    WireSequencesComponent,
  ]
})
export class ComponentsModule {
}
