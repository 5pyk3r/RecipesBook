import {Component,  EventEmitter, Output} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {Ingredient} from '../data/ingredient';

@Component({
  selector: 'app-chips-input',
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.css']
})
export class ChipsInputComponent{

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @Output()
  ingredients2 = new EventEmitter<Ingredient[]>();

  ingredients: Ingredient[] = [];



  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.ingredients.push({name: value.trim()});
      this.ingredients2.emit(this.ingredients);
    }

    if (input) {
      input.value = '';
    }
  }

  remove(ingredient: Ingredient): void {
    const index = this.ingredients.indexOf(ingredient);
    if (index >= 0) {
      this.ingredients.splice(index, 1);
    }
  }

}
