import {Component} from '@angular/core';

enum KeypadIcon {
  COPYRIGHT = '1-copyright.png',
  FILLED_STAR = '2-filledstar.png',
  HOLLOW_STAR = '3-hollowstar.png',
  SMILEY_FACE = '4-smileyface.png',
  DOUBLE_K = '5-doublek.png',
  OMEGA = '6-omega.png',
  SQUID_KNIFE = '7-squidknife.png',
  PUMPKIN = '8-pumpkin.png',
  HOOK_N = '9-hookn.png',
  SIX = '11-six.png',
  SQUIGGLY_N = '12-squigglyn.png',
  A_T = '13-at.png',
  A_E = '14-ae.png',
  MELTED_THREE = '15-meltedthree.png',
  EURO = '16-euro.png',
  N_WITH_HAT = '18-nwithhat.png',
  DRAGON = '19-dragon.png',
  QUESTION_MARK = '20-questionmark.png',
  PARAGRAPH = '21-paragraph.png',
  RIGHT_C = '22-rightc.png',
  LEFT_C = '23-leftc.png',
  PITCHFORK = '24-pitchfork.png',
  CURSIVE = '26-cursive.png',
  TRACKS = '27-tracks.png',
  BALLOON = '28-balloon.png',
  UPSIDEDOWN_Y = '30-upsidedowny.png',
  B_T = '31-bt.png',
}

const COULMNS = [
  [
    KeypadIcon.BALLOON, KeypadIcon.A_T, KeypadIcon.UPSIDEDOWN_Y,
    KeypadIcon.SQUIGGLY_N, KeypadIcon.SQUID_KNIFE, KeypadIcon.HOOK_N,
    KeypadIcon.LEFT_C
  ],
  [
    KeypadIcon.EURO, KeypadIcon.BALLOON, KeypadIcon.LEFT_C, KeypadIcon.CURSIVE,
    KeypadIcon.HOLLOW_STAR, KeypadIcon.HOOK_N, KeypadIcon.QUESTION_MARK
  ],
  [
    KeypadIcon.COPYRIGHT, KeypadIcon.PUMPKIN, KeypadIcon.CURSIVE,
    KeypadIcon.DOUBLE_K, KeypadIcon.MELTED_THREE, KeypadIcon.UPSIDEDOWN_Y,
    KeypadIcon.HOLLOW_STAR
  ],
  [
    KeypadIcon.SIX, KeypadIcon.PARAGRAPH, KeypadIcon.B_T,
    KeypadIcon.SQUID_KNIFE, KeypadIcon.DOUBLE_K, KeypadIcon.QUESTION_MARK,
    KeypadIcon.SMILEY_FACE
  ],
  [
    KeypadIcon.PITCHFORK, KeypadIcon.SMILEY_FACE, KeypadIcon.B_T,
    KeypadIcon.RIGHT_C, KeypadIcon.PARAGRAPH, KeypadIcon.DRAGON,
    KeypadIcon.FILLED_STAR
  ],
  [
    KeypadIcon.SIX, KeypadIcon.EURO, KeypadIcon.TRACKS, KeypadIcon.A_E,
    KeypadIcon.PITCHFORK, KeypadIcon.N_WITH_HAT, KeypadIcon.OMEGA
  ],
];

@Component({
  selector: 'app-keypads',
  templateUrl: './keypads.component.html',
  styleUrls: ['./keypads.component.scss'],
})
export class KeypadsComponent {
  icons = Object.values(KeypadIcon);
  input: KeypadIcon[] = [];

  constructor() {}

  get output(): KeypadIcon[] {
    if (this.input.length < 4) {
      return [];
    }

    // should only be one possible column at this point
    const column = this.possibleColumns()[0];

    // sort the input icons by their positions in this column
    return this.input.sort((a, b) => column.indexOf(a) - column.indexOf(b));
  }

  addIcon(icon: KeypadIcon) {
    this.input.push(icon);
  }

  removeLastIcon() {
    if (this.input.length) {
      const index = this.input.length - 1;
      this.input.splice(index, 1);
    }
  }

  isPossible(icon: KeypadIcon): boolean {
    if (this.input.length >= 4 || this.input.includes(icon)) {
      return false;
    }

    // fancy one-liner for concatenating N arrays:
    // https://stackoverflow.com/a/6768642/2943405
    return [].concat.apply([], this.possibleColumns()).includes(icon);
  }

  private possibleColumns(): KeypadIcon[][] {
    return COULMNS.filter(column => {
      for (const icon of this.input) {
        if (!column.includes(icon)) {
          return false;
        }
      }
      return true;
    });
  }
}
