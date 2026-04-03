import { Component, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-person',
  standalone: false,
  templateUrl: './person.html',
  styleUrl: './person.scss',
})
export class Person {
  @Input({required: true}) personName: string = '';
  @Input({required: true}) personAge: number = 0;
  @Input({required: true}) personIndex: number = 0;
  @Input({required: true}) isOdd: boolean = false;
  @Input({required: true}) isFirst: boolean = false;
  @Input({required: true}) isLast: boolean = false;
  @Input({required: true}) isSelected: boolean = false;

  @Output() personSelected = new EventEmitter<number>();
  onPersonSelected(){
    this.personSelected.emit(this.personIndex);
  }
}
