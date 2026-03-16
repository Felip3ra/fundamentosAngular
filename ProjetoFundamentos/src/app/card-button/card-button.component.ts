import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-card-button',
  //templateUrl: './card-button.component.html',
  //cria um template para renderizar na pagina
  //obs: que seja curto
  // template: `
  //   <div class="card-button">
  //       Adquirir
  //   </div>
  // `,
  templateUrl: 'card-button.component.html',
  styleUrls: ['./card-button.component.scss']
})
export class CardButtonComponent {

  @Output('buttonClick') buttonClickEmitter = new EventEmitter<boolean>();

   onButtonClick(){
    this.buttonClickEmitter.emit(true);
  }
}
