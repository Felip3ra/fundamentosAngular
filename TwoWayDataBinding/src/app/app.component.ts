import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  name: string = 'Felipe';

  // handleInputChange(event: any){
  //   this.name = event;
  // }
  personSelectedIndex: number | undefined;
  listPeople = [
    { name: 'Joao', age: 30 },
    { name: 'Maria', age: 25 },
    { name: 'Pedro', age: 35 },
    { name: 'Ana', age: 28 },
  ];

  selectPerson(index: number) {
    this.personSelectedIndex = index;
  }
}
