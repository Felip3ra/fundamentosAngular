import { Component, ViewEncapsulation } from '@angular/core';

interface IPlano{
  infos: IInfos;
}

interface IInfos{
  tipo: string;
  preco: number;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  //encapsulation: ViewEncapsulation.None
  encapsulation: ViewEncapsulation.Emulated
})

//encapsulation: ViewEncapsulation.None
//remove a encapsulação dos estilos ou seja, os estilos vão estar global

//encapsulation: ViewEncapsulation.Emulated
//os estilos não ficam globais, porém estilos globais afetam os componentes

export class CardComponent {
 
  //@ts-ignore
  plano : IPlano = {
    infos: {
      tipo: 'simples',
      preco: 100
    },
  };
}
