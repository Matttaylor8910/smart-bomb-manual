import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {BombStateComponent} from './bomb-state/bomb-state.component';
import {ComplicatedWiresComponent} from './complicated-wires/complicated-wires.component';
import {KeypadsComponent} from './keypads/keypads.component';
import {KnobsComponent} from './knobs/knobs.component';
import {LedComponent} from './led/led.component';
import {MazesComponent} from './mazes/mazes.component';
import {MemoryComponent} from './memory/memory.component';
import {ModuleWindowComponent} from './module-window/module-window.component';
import {MorseCodeComponent} from './morse-code/morse-code.component';
import {PasswordsComponent} from './passwords/passwords.component';
import {SimonSaysComponent} from './simon-says/simon-says.component';
import {TheButtonComponent} from './the-button/the-button.component';
import {WhosOnFirstComponent} from './whos-on-first/whos-on-first.component';
import {WireSequencesComponent} from './wire-sequences/wire-sequences.component';
import {WiresComponent} from './wires/wires.component';

@NgModule({
  declarations: [
    BombStateComponent,
    ModuleWindowComponent,
    ComplicatedWiresComponent,
    KeypadsComponent,
    KnobsComponent,
    LedComponent,
    MazesComponent,
    MemoryComponent,
    MorseCodeComponent,
    PasswordsComponent,
    SimonSaysComponent,
    TheButtonComponent,
    WhosOnFirstComponent,
    WireSequencesComponent,
    WiresComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
  exports: [
    BombStateComponent,
    ModuleWindowComponent,
    ComplicatedWiresComponent,
    KeypadsComponent,
    KnobsComponent,
    LedComponent,
    MazesComponent,
    MemoryComponent,
    MorseCodeComponent,
    PasswordsComponent,
    SimonSaysComponent,
    TheButtonComponent,
    WhosOnFirstComponent,
    WireSequencesComponent,
    WiresComponent,
  ]
})
export class ComponentsModule {
}
