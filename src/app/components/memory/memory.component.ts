import {Component} from '@angular/core';

interface Stage {
  display: number;
  label: {value: number; disabled: boolean;};
  position: {value: number; disabled: boolean;};
}

enum Info {
  DISPLAY = 'DISPLAY',
  LABEL = 'LABEL',
  POSITION = 'POSITION',
}

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss'],
})
export class MemoryComponent {
  Info = Info;

  stages: Stage[] = [];

  constructor() {
    this.addNewStage();
  }

  get currentInfo(): Info {
    if (this.stages.length) {
      const stage = this.stages[this.stages.length - 1];
      if (!stage.display) {
        return Info.DISPLAY;
      } else {
        return stage.label.value ? Info.POSITION : Info.LABEL;
      }
    }

    return null;
  }

  get currentStage(): Stage {
    return this.stages[this.stages.length - 1];
  }

  setDisplay(index: number, value: number) {
    const stage = this.stages[index];
    stage.display = value;

    // reset label and positions for this stage and clear any future stages
    stage.label = {value: null, disabled: false};
    stage.position = {value: null, disabled: false};
    this.stages.splice(index + 1);

    // Stage 1
    if (index === 0) {
      // If the display is 1, press the button in the second position.
      // If the display is 2, press the button in the second position.
      // If the display is 3, press the button in the third position.
      // If the display is 4, press the button in the fourth position.
      stage.position.value = value < 3 ? 2 : value;
      stage.position.disabled = true;
    }

    // Stage 2
    else if (index === 1) {
      // If the display is 1, press the button labeled "4".
      if (value === 1) {
        stage.label = {value: 4, disabled: true};
      }
      // If the display is 3, press the button in the first position.
      else if (value === 3) {
        stage.position = {value: 1, disabled: true};
      }
      // If the display is 2, press the button in the same position as you
      // pressed in stage 1.
      // If the display is 4, press the button in the same position as you
      // pressed in stage 1.
      else {
        stage.position.value = this.stages[0].position.value;
        stage.position.disabled = true;
      }
    }

    // Stage 3
    else if (index === 2) {
      // If the display is 1, press the button with the same label you pressed
      // in stage 2.
      if (value === 1) {
        stage.label.value = this.stages[1].label.value;
        stage.label.disabled = true;
      }
      // If the display is 2, press the button with the same label you pressed
      // in stage 1.
      else if (value === 2) {
        stage.label.value = this.stages[0].label.value;
        stage.label.disabled = true;
      }
      // If the display is 3, press the button in the third position.
      else if (value === 3) {
        stage.position = {value, disabled: true};
      }
      // If the display is 4, press the button labeled "4".
      else {
        stage.label = {value, disabled: true};
      }
    }

    // Stage 4
    else if (index === 3) {
      // If the display is 1, press the button in the same position as you
      // pressed in stage 1.
      if (value === 1) {
        stage.position.value = this.stages[0].position.value;
        stage.position.disabled = true;
      }
      // If the display is 2, press the button in the first position.
      else if (value === 2) {
        stage.position = {value: 1, disabled: true};
      }
      // If the display is 3, press the button in the same position as you
      // pressed in stage 2.
      // If the display is 4, press the button in the same position as you
      // pressed in stage 2.
      else {
        stage.position.value = this.stages[1].position.value;
        stage.position.disabled = true;
      }
    }

    // Stage 5
    else {
      // If the display is 1, press the button with the same label you pressed
      // in stage 1.
      if (value === 1) {
        stage.label = this.stages[0].label;
      }
      // If the display is 2, press the button with the same label you pressed
      // in stage 2.
      else if (value === 2) {
        stage.label = this.stages[1].label;
      }
      // If the display is 3, press the button with the same label you pressed
      // in stage 4.
      else if (value === 3) {
        stage.label = this.stages[3].label;
      }
      // If the display is 4, press the button with the same label you pressed
      // in stage 3.
      else {
        stage.label = this.stages[2].label;
      }

      // we need no more input at this point
      stage.label.disabled = true;
      stage.position.disabled = true;
    }
  }

  setLabel(stage: Stage, value: number) {
    if (stage.label.value === null) {
      this.addNewStage();
    }
    stage.label.value = value;
  }

  setPosition(stage: Stage, value: number) {
    if (stage.position.value === null) {
      this.addNewStage();
    }
    stage.position.value = value;
  }

  private addNewStage() {
    if (this.stages.length < 5) {
      this.stages.push({
        display: null,
        label: {value: null, disabled: true},
        position: {value: null, disabled: true},
      });
    }
  }
}
