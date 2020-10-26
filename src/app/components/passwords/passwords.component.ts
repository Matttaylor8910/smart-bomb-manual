import {Component} from '@angular/core';
import {intersection} from 'lodash';

const WORDS = [
  'about', 'after', 'again', 'below', 'could', 'every', 'first',
  'found', 'great', 'house', 'large', 'learn', 'never', 'other',
  'place', 'plant', 'point', 'right', 'small', 'sound', 'spell',
  'still', 'study', 'their', 'there', 'these', 'thing', 'think',
  'three', 'water', 'where', 'which', 'world', 'would', 'write'
];

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.scss'],
})
export class PasswordsComponent {
  WORDS_PER_COLUMN = 6;

  allWords = WORDS;
  words = [...WORDS];
  options = [];

  constructor() {}

  filterPasswords() {
    this.words = intersection.apply(
        null,
        this.options
            .map(this.filterByColumn.bind(this))
            // filter out empty sets because the intersection doesn't make
            // sense. this is because the map above will return [undefined,
            // undefined, ['a','b']] for example and the
            // intersection does the right thing and assumes the
            // intersection would be an empty set. Found by brik
            .filter(col => col));
  }

  filterByColumn(optionRow: string, index: number) {
    // empty filter means all
    if (!optionRow || optionRow.length !== this.WORDS_PER_COLUMN) return WORDS;

    var optionChars = optionRow.toLowerCase().split('');
    return WORDS.filter(function(password) {
      return optionChars.includes(password.toLowerCase()[index]);
    });
  }
}
