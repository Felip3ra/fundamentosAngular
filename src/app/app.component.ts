import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // inputText = "Texto Inicial";
  // inputType = "text";
  // isDisabled = false;

  // enableInput(){
  //   this.isDisabled = false;
  // }

  // disableInput(){
  //   this.isDisabled = true;
  // }
  // handleInputKeyup(event: KeyboardEvent){
  //   //casting para forçar o event a ser um elemento do tipo input
  //   console.log(((event.target) as HTMLInputElement).value);
  // }
  // handleInputEvent(event: Event){
  //   console.log(((event.target) as HTMLInputElement).value);
  // }

  buttonTittle = 'Titulo do botão';
  buttonDisabled = false;

  onButtonClick(){
    this.buttonTittle = 'Alterado';
    this.buttonDisabled = !this.buttonDisabled;
  }
}
