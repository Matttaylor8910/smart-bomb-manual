import {Component} from '@angular/core';

enum Morse {
  DOT = '.',
  DASH = '-'
}

const LETTERS = {
  '.-': 'A',
  '-...': 'B',
  '-.-.': 'C',
  '-..': 'D',
  '.': 'E',
  '..-.': 'F',
  '--.': 'G',
  '....': 'H',
  '..': 'I',
  '.---': 'J',
  '-.-': 'K',
  '.-..': 'L',
  '--': 'M',
  '-.': 'N',
  '---': 'O',
  '.--.': 'P',
  '--.-': 'Q',
  '.-.': 'R',
  '...': 'S',
  '-': 'T',
  '..-': 'U',
  '...-': 'V',
  '.--': 'W',
  '-..-': 'X',
  '-.--': 'Y',
  '--..': 'Z',
}

const WORDS: WordFrequency[] = [
  {word: 'SHELL', frequency: '3.505'},
  {word: 'HALLS', frequency: '3.515'},
  {word: 'SLICK', frequency: '3.522'},
  {word: 'TRICK', frequency: '3.532'},
  {word: 'BOXES', frequency: '3.535'},
  {word: 'LEAKS', frequency: '3.542'},
  {word: 'STROBE', frequency: '3.545'},
  {word: 'BISTRO', frequency: '3.552'},
  {word: 'FLICK', frequency: '3.555'},
  {word: 'BOMBS', frequency: '3.565'},
  {word: 'BREAK', frequency: '3.572'},
  {word: 'BRICK', frequency: '3.575'},
  {word: 'STEAK', frequency: '3.582'},
  {word: 'STING', frequency: '3.592'},
  {word: 'VECTOR', frequency: '3.595'},
  {word: 'BEATS', frequency: '3.600'},
];

interface MorseLetter {
  morse: string[];
  letter: string;
}

interface WordFrequency {
  word: string;
  frequency: string;
}

const MAX_SYMBOLS = 4;
const MAX_LETTERS = 6;

@Component({
  selector: 'app-morse-code',
  templateUrl: './morse-code.component.html',
  styleUrls: ['./morse-code.component.scss'],
})
export class MorseCodeComponent {
  Morse = Morse;
  WORDS = WORDS;

  input: string[] = [];
  letters: MorseLetter[] = [];

  constructor() {}

  get letter(): string {
    return LETTERS[this.input.join('')];
  }

  get inputDisabled() {
    return this.input.length >= MAX_SYMBOLS ||
        this.letters.length >= MAX_LETTERS;
  }

  addDot() {
    this.input.push(Morse.DOT);
  }

  addDash() {
    this.input.push(Morse.DASH);
  }

  add() {
    const key = this.input.join('');
    this.letters.push({morse: [...this.input], letter: LETTERS[key]});
    this.clear();
  }

  clear() {
    this.input = [];
  }

  removeLetter(index: number) {
    this.letters.splice(index, 1);
  }

  isPossible(item: WordFrequency): boolean {
    for (const letter of this.letters) {
      if (!item.word.includes(letter.letter)) {
        return false;
      }
    }
    return true;
  }
}
