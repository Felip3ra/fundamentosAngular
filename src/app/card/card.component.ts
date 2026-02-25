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
  encapsulation: ViewEncapsulation.None
})

//encapsulation: ViewEncapsulation.None
//remove a encapsulação dos estilos ou seja, os estilos vão estar global

export class CardComponent {
 
  //@ts-ignore
  plano : IPlano = {
    infos: {
      tipo: 'simples',
      preco: 100
    },
  };
}
