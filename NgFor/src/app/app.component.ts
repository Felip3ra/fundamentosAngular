import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  personSelectedIndex: number | undefined;
  listPessoas = [
    { nome: 'João', idade: 30 },
    { nome: 'Maria', idade: 25 },
    { nome: 'Pedro', idade: 35 },
    { nome: 'Ana', idade: 28 },
  ];

  selectPerson(index: number){
    this.personSelectedIndex = index;
  }
}
