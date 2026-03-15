import { Component, Input, ViewEncapsulation } from '@angular/core';

// interface IPlano{
//   infos: IInfos;
// }

// interface IInfos{
//   tipo: string;
//   preco: number;
// }

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  //encapsulation: ViewEncapsulation.None
  //encapsulation: ViewEncapsulation.Emulated
  //encapsulation: ViewEncapsulation.ShadowDom
})

//encapsulation: ViewEncapsulation.None
//remove a encapsulação dos estilos ou seja, os estilos vão estar global

//encapsulation: ViewEncapsulation.Emulated
//os estilos não ficam globais, porém estilos globais afetam os componentes

//encapsulation: ViewEncapsulation.ShadowDom
//os estilos não ficam globais e os estilos globais não afetam o componente pai, somente os filhos

export class CardComponent {
 
  //@ts-ignore
  // plano : IPlano = {
  //   infos: {
  //     tipo: 'simples',
  //     preco: 100
  //   },
  // };
  @Input({required: true}) planPrice : number = 0
  
  private _planType: string = '';
  @Input('planTypeAlias') set planType(value: string){
    this._planType = value.toUpperCase();
  }
  get planType(): string{
    return this._planType;
  }

  buttonClicked(event: boolean){
    console.log(event)
  }
}
