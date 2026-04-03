# Anotações de Estudo Angular

Este arquivo resume o que foi praticado neste projeto com base nos comentários e no código existente.

## 1. Estrutura básica de um projeto Angular

- O Angular organiza a aplicação em módulos e componentes.
- O componente raiz é o `AppComponent`.
- O módulo raiz é o `AppModule`.

### AppModule

No projeto, o `AppModule` mostra duas responsabilidades principais:

- `declarations`: onde ficam componentes, diretivas e pipes pertencentes ao módulo.
- `imports`: onde ficam outros módulos necessários para o funcionamento da aplicação.

Exemplo visto:

- `AppComponent` foi declarado no `AppModule`.
- `CardsModule` foi importado no `AppModule`.

Resumo mental:

- Declare o que pertence ao módulo.
- Importe o que o módulo precisa usar.

### Exemplo de `AppModule`

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardsModule } from './cards/cards.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CardsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## 2. Organização em módulos

O projeto também usa um módulo específico para os cards: `CardsModule`.

### CardsModule

Nele aparecem três conceitos importantes:

- `declarations`: registra os componentes criados dentro do módulo.
- `imports`: traz dependências como `CommonModule` e `MatSliderModule`.
- `exports`: expõe componentes para serem usados em outros módulos.

Exemplo prático deste projeto:

- `CardComponent`, `CardRoxoComponent`, `CardButtonComponent`, `CardRoxoButtonComponent` e `CardButtonCancelComponent` foram declarados no `CardsModule`.
- Esses componentes também foram exportados para uso fora desse módulo.

### Exemplo de módulo compartilhando componentes

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from '../card/card.component';
import { CardButtonComponent } from '../card-button/card-button.component';

@NgModule({
  declarations: [
    CardComponent,
    CardButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    CardButtonComponent
  ]
})
export class CardsModule {}
```

## 3. Componentes Angular

Um componente é formado principalmente por:

- `selector`: nome da tag usada no HTML.
- `templateUrl` ou `template`: define o conteúdo visual.
- `styleUrls` ou `styles`: define os estilos.

### Exemplo com template externo

O `CardComponent` usa:

- `templateUrl`
- `styleUrls`

Esse é o formato mais comum quando o HTML e o CSS ficam maiores.

### Exemplo com template inline

O `CardButtonComponent` usa `template` direto no decorator:

- útil para trechos pequenos
- deixa o componente mais compacto
- não é a melhor escolha para templates grandes

Resumo:

- `template`: bom para HTML curto
- `templateUrl`: melhor para arquivos maiores

### Exemplo de componente com arquivo externo

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {}
```

### Exemplo de componente com template inline

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-card-button',
  template: `
    <div class="card-button">
      Adquirir
    </div>
  `,
  styleUrls: ['./card-button.component.scss']
})
export class CardButtonComponent {}
```

## 4. Estilos em componentes

O projeto mostra duas formas de trabalhar estilos:

- `styleUrls`: arquivo SCSS/CSS separado
- `styles`: estilos inline no decorator

No `CardButtonCancelComponent`, há comentários mostrando uma alternativa com `styles`, mas o componente usa `styleUrls` na prática.

Resumo:

- `styles` pode ser útil para exemplos simples
- `styleUrls` é melhor para organização em projetos reais

### Exemplo com `styles` inline

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-exemplo',
  template: `<p class="texto">Exemplo</p>`,
  styles: [`
    .texto {
      color: red;
      font-weight: bold;
    }
  `]
})
export class ExemploComponent {}
```

## 5. Vinculação de propriedade (`Property Binding`)

No `AppComponent`, foi trabalhada a vinculação de propriedades.

Exemplo usado no projeto:

```html
<input
  id="meu-input"
  [value]="inputText"
  [type]="inputType"
  [disabled]="isDisabled"
/>
```

O que isso significa:

- `[value]` liga a propriedade `value` do elemento ao valor da classe
- `[type]` define o tipo do input dinamicamente
- `[disabled]` habilita ou desabilita o campo com base no estado do componente

Resumo mental:

- colchetes `[]` significam binding de propriedade
- o valor vem da classe TypeScript

### Exemplo completo

```ts
export class AppComponent {
  inputText = 'Texto Inicial';
  inputType = 'text';
  isDisabled = false;
}
```

```html
<input
  [value]="inputText"
  [type]="inputType"
  [disabled]="isDisabled"
/>
```

## 5.1 Vinculação de atributo (`Attribute Binding`)

Além de `property binding`, o Angular também permite fazer binding de atributos HTML.

Diferença principal:

- `property binding` altera a propriedade do elemento no DOM
- `attribute binding` altera o atributo HTML usando o prefixo `attr.`

Quando usar:

- quando o Angular não consegue associar diretamente a uma propriedade nativa
- quando você precisa definir atributos como `colspan`, `aria-label`, `aria-describedby`, `role` ou `data-*`

### Sintaxe

```html
[attr.nome-do-atributo]="valor"
```

### Exemplo simples

```ts
export class TabelaComponent {
  totalColunas = 2;
}
```

```html
<td [attr.colspan]="totalColunas">Conteúdo expandido</td>
```

### Exemplo com acessibilidade

```ts
export class BotaoComponent {
  descricao = 'Fechar modal';
}
```

```html
<button [attr.aria-label]="descricao">
  X
</button>
```

### Exemplo com `data-*`

```ts
export class CardComponent {
  categoria = 'premium';
}
```

```html
<div [attr.data-category]="categoria">
  Plano Premium
</div>
```

Resumo:

- use `[]` para propriedades
- use `[attr.x]` para atributos HTML
- `attribute binding` é muito comum em tabelas e acessibilidade

## 5.2 Vinculação de estilo CSS (`Style Binding`)

O Angular permite aplicar estilos CSS dinamicamente direto no template.

Diferença principal:

- `property binding` altera propriedades do elemento
- `attribute binding` altera atributos HTML
- `style binding` altera estilos CSS inline

Quando usar:

- quando a cor, largura, altura ou display dependem do estado do componente
- quando você quer mudar o visual sem precisar criar várias classes CSS

### Sintaxe

```html
[style.nome-do-estilo]="valor"
```

Também é possível informar unidade:

```html
[style.width.px]="largura"
```

### Exemplo simples

```ts
export class BotaoComponent {
  corFundo = 'green';
}
```

```html
<button [style.background-color]="corFundo">
  Confirmar
</button>
```

### Exemplo com unidade

```ts
export class CaixaComponent {
  largura = 300;
}
```

```html
<div [style.width.px]="largura">
  Conteúdo da caixa
</div>
```

### Exemplo com condição

```ts
export class StatusComponent {
  ativo = true;
}
```

```html
<p [style.color]="ativo ? 'green' : 'red'">
  Status do plano
</p>
```

Resumo:

- use `[style.propriedade]` para estilos dinâmicos
- use `[style.propriedade.unidade]` quando precisar de `px`, `%` e similares
- `style binding` é útil para mudanças visuais rápidas controladas pelo componente

## 5.3 Vinculação de classe CSS (`Class Binding`)

O Angular também permite adicionar ou remover classes CSS dinamicamente.

Diferença principal:

- `style binding` altera um estilo específico inline
- `class binding` ativa ou desativa classes CSS inteiras

Quando usar:

- quando o visual depende de um estado como ativo, erro, destaque ou desabilitado
- quando você quer reaproveitar regras CSS já definidas no arquivo `.scss`

### Sintaxe

```html
[class.nome-da-classe]="condicao"
```

Também é possível trocar várias classes com `ngClass`:

```html
[ngClass]="{ ativo: true, erro: false }"
```

### Exemplo simples

```ts
export class CardComponent {
  destaque = true;
}
```

```html
<div [class.destaque]="destaque">
  Plano em destaque
</div>
```

```scss
.destaque {
  border: 2px solid orange;
  background-color: #fff3cd;
}
```

### Exemplo com condição

```ts
export class StatusComponent {
  ativo = false;
}
```

```html
<p [class.ativo]="ativo" [class.inativo]="!ativo">
  Status do usuário
</p>
```

```scss
.ativo {
  color: green;
}

.inativo {
  color: red;
}
```

### Exemplo com `ngClass`

```ts
export class AlertaComponent {
  sucesso = true;
  erro = false;
}
```

```html
<div [ngClass]="{ sucesso: sucesso, erro: erro }">
  Mensagem do sistema
</div>
```

Resumo:

- use `[class.nome]` para ativar uma classe com base em condição
- use `ngClass` quando precisar lidar com várias classes
- `class binding` é melhor do que `style binding` quando o estilo já existe no CSS

## 5.4 Vinculação em duas vias (`Two-Way Data Binding`)

O `two-way data binding` conecta o template e a classe em duas direções.

Em outras palavras:

- quando o usuário altera o campo, a variável na classe é atualizada
- quando a variável muda na classe, o campo no template também muda

No Angular, isso é feito com a sintaxe:

```html
[(ngModel)]="minhaVariavel"
```

Esse formato é conhecido como "banana in a box" e combina:

- property binding: `[ngModel]`
- event binding: `(ngModelChange)`

### Pré-requisito

Para usar `ngModel`, o módulo precisa importar `FormsModule`.

```ts
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule]
})
export class AppModule {}
```

### Exemplo simples com input

```ts
export class PerfilComponent {
  nome = 'Felipe';
}
```

```html
<input [(ngModel)]="nome" />
<p>Nome digitado: {{ nome }}</p>
```

### Exemplo com checkbox

```ts
export class TermosComponent {
  aceitou = false;
}
```

```html
<input type="checkbox" [(ngModel)]="aceitou" />
<p>{{ aceitou ? 'Aceitou os termos' : 'Não aceitou os termos' }}</p>
```

Resumo:

- `[(ngModel)]` faz ligação de ida e volta
- é útil para formulários e campos editáveis
- sem `FormsModule`, o `ngModel` não funciona

## 6. Event Binding

No mesmo exemplo do `AppComponent`, foram usados eventos:

```html
<button (click)="enableInput()">Habilitar</button>
<button (click)="disableInput()">desabilitar</button>
```

E na classe:

```ts
enableInput() {
  this.isDisabled = false;
}

disableInput() {
  this.isDisabled = true;
}
```

O que isso ensina:

- parênteses `()` representam binding de evento
- o método chamado fica no arquivo `.ts`
- a tela reage ao estado do componente

### Exemplo completo

```ts
export class AppComponent {
  isDisabled = false;

  enableInput() {
    this.isDisabled = false;
  }

  disableInput() {
    this.isDisabled = true;
  }
}
```

```html
<button (click)="enableInput()">Habilitar</button>
<button (click)="disableInput()">Desabilitar</button>
```

## 7. Interpolação no template

No `CardComponent`, o HTML usa interpolação para exibir dados:

```html
Plano <b>{{ plano.infos?.tipo ? plano.infos.tipo : 'vazio' }}</b>
R${{ plano.infos?.preco }}
```

Conceitos vistos:

- `{{ }}` insere valores da classe no HTML
- `?.` evita erro quando um valor pode estar indefinido
- operador ternário ajuda a definir valor padrão

Resumo:

- interpolação serve para mostrar dados
- safe navigation (`?.`) evita quebra ao acessar propriedades opcionais

### Exemplo simples

```ts
export class CardComponent {
  titulo = 'Plano Premium';
  preco = 99.9;
}
```

```html
<h2>{{ titulo }}</h2>
<p>R$ {{ preco }}</p>
```

## 8. Tipagem com interfaces

No `CardComponent`, os dados foram organizados com interfaces:

```ts
interface IPlano {
  infos: IInfos;
}

interface IInfos {
  tipo: string;
  preco: number;
}
```

Isso ajuda a:

- tipar melhor os dados
- facilitar manutenção
- deixar o componente mais previsível

Resumo:

- usar interfaces melhora a estrutura do código
- é uma boa prática em Angular com TypeScript

### Exemplo prático

```ts
interface IUsuario {
  nome: string;
  idade: number;
}

export class PerfilComponent {
  usuario: IUsuario = {
    nome: 'Fernanda',
    idade: 28
  };
}
```

## 9. Encapsulamento de estilos

Este é um dos pontos mais importantes vistos no projeto.

No `CardComponent`, foi explorado:

- `ViewEncapsulation.None`
- `ViewEncapsulation.Emulated`
- `ViewEncapsulation.ShadowDom`

### `ViewEncapsulation.None`

- remove a encapsulação
- os estilos do componente passam a agir de forma global

### `ViewEncapsulation.Emulated`

- é o comportamento padrão do Angular
- os estilos do componente ficam isolados artificialmente
- estilos globais ainda podem afetar esse componente

### `ViewEncapsulation.ShadowDom`

- usa Shadow DOM real
- estilos globais não entram no componente da mesma forma
- o componente fica mais isolado visualmente

No projeto, o `CardComponent` está usando:

```ts
encapsulation: ViewEncapsulation.ShadowDom
```

### Exemplo comparando opções

```ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-exemplo',
  templateUrl: './exemplo.component.html',
  styleUrls: ['./exemplo.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ExemploComponent {}
```

## 10. Estilos globais x estilos locais

O projeto deixa claro que:

- `src/styles.scss` afeta a aplicação inteira
- `styleUrls` do componente afetam apenas o componente, dependendo da encapsulação

Exemplo global em `styles.scss`:

```scss
.mdc-slider__track--active_fill {
  border-color: yellowgreen !important;
}
```

Exemplo local em `card.component.scss`:

```scss
:host ::ng-deep .mdc-slider__track--active_fill {
  border-color: yellow !important;
}
```

Isso foi usado para observar como o encapsulamento interfere no estilo aplicado.

### Exemplo de estilo global

```scss
/* styles.scss */
body {
  margin: 0;
}

.titulo-global {
  color: blue;
}
```

### Exemplo de estilo local de componente

```scss
/* card.component.scss */
.titulo-local {
  color: orange;
}
```

## 11. Uso de `:host`

No projeto há comentários explicando que `:host` se refere ao próprio componente onde o CSS está escrito.

Exemplo:

```scss
:host ::ng-deep .card-cancel-button {
  background-color: yellow !important;
}
```

Leitura prática:

- aplique o estilo a algo dentro deste componente
- limite a alteração ao contexto do host

### Exemplo direto com `:host`

```scss
:host {
  display: block;
  border: 2px solid black;
}
```

Nesse caso, o próprio componente recebe o estilo.

## 12. Uso de `::ng-deep`

O projeto mostra `::ng-deep` para alcançar elementos internos de componentes filhos ou elementos gerados por bibliotecas.

Exemplos vistos:

- customização de `.card-cancel-button`
- customização de `.mdc-slider__track--active_fill`

O que entender:

- `::ng-deep` atravessa o isolamento de estilos
- pode afetar filhos e estruturas internas
- deve ser usado com cuidado, porque enfraquece o encapsulamento

Observação de estudo:

- hoje ele é tratado como recurso especial e deve ser evitado quando houver alternativa melhor
- ainda aparece em cenários práticos, principalmente com bibliotecas de UI

### Exemplo de uso

```scss
:host ::ng-deep .mat-mdc-button {
  border-radius: 20px;
}
```

## 13. Shadow DOM na prática

O projeto compara comportamento de classes como:

- `.shadow-dom`
- classes comentadas para testes globais e emulados

Objetivo do experimento:

- verificar quando um estilo global consegue ou não atingir o conteúdo do componente
- entender a diferença real entre global, emulado e Shadow DOM

### Exemplo prático com Shadow DOM

```ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-shadow-demo',
  template: `<p class="titulo">Texto do componente</p>`,
  styleUrls: ['./shadow-demo.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ShadowDemoComponent {}
```

```scss
/* shadow-demo.component.scss */
.titulo {
  color: green;
}
```

```scss
/* styles.scss */
.titulo {
  color: red;
}
```

Resultado esperado:

- com `ShadowDom`, o estilo local tende a ficar isolado
- o `.titulo` global não entra com a mesma facilidade dentro do componente

## 14. SCSS e variáveis

O projeto usa SCSS com importação de variável:

Arquivo:

```scss
// src/styles/_variables.scss
$bgColor: green;
```

Uso no componente:

```scss
@import "variables";

.card-cancel-button {
  background-color: $bgColor;
}
```

Conceitos vistos:

- criação de variáveis SCSS
- reaproveitamento de valores de estilo
- separação entre configuração e implementação visual

### Exemplo com mais de uma variável

```scss
/* _variables.scss */
$primaryColor: #fd7557;
$textColor: #222;
```

```scss
/* card.component.scss */
@import "variables";

.card {
  background-color: $primaryColor;
  color: $textColor;
}
```

## 15. Angular Material

O projeto também utiliza Angular Material.

### Módulo importado

No `CardsModule`:

```ts
import { MatSliderModule } from '@angular/material/slider';
```

### Uso no template

Nos componentes:

```html
<mat-slider min="1" max="5" step="0.5">
  <input matSliderThumb value="1.5">
</mat-slider>
```

### Tema global

Em `styles.scss`:

```scss
@import "@angular/material/prebuilt-themes/indigo-pink.css";
```

Resumo:

- para usar um componente do Angular Material, normalmente é preciso importar o módulo correspondente
- o tema global define a aparência base dos componentes Material

### Exemplo mínimo

```ts
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  imports: [MatSliderModule]
})
export class ExemploModule {}
```

```html
<mat-slider min="0" max="100" step="10">
  <input matSliderThumb value="50">
</mat-slider>
```

## 16. Composição de componentes

O projeto trabalha composição no template:

```html
<app-card-button></app-card-button>
<app-card-button-cancel></app-card-button-cancel>
```

Isso mostra que:

- um componente pode conter outros componentes
- a interface pode ser dividida em partes reutilizáveis

Resumo:

- pense em componentes pequenos e com responsabilidade clara

### Exemplo

```html
<app-card>
  <app-card-button></app-card-button>
  <app-card-button-cancel></app-card-button-cancel>
</app-card>
```

## 17. Seletores personalizados

Exemplos do projeto:

- `app-card`
- `app-card-button`
- `app-card-button-cancel`
- `card-roxo`

Isso mostra que o Angular renderiza componentes por meio de tags personalizadas definidas em `selector`.

### Exemplo

```ts
@Component({
  selector: 'app-perfil',
  template: `<p>Perfil do usuário</p>`
})
export class PerfilComponent {}
```

Uso no HTML:

```html
<app-perfil></app-perfil>
```

## 18. Decorator `@Input()`

O decorator `@Input()` permite que um componente pai envie dados para um componente filho.

Em outras palavras:

- o componente pai passa um valor
- o componente filho recebe esse valor por uma propriedade decorada com `@Input()`

Quando usar:

- para reaproveitar componentes com conteúdos diferentes
- para deixar o componente filho configurável
- para comunicação de pai para filho

### Sintaxe básica

```ts
@Input() nomeDaPropriedade = valorInicial;
```

### Exemplo do componente filho

```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-produto',
  template: `<p>{{ nome }}</p>`
})
export class ProdutoComponent {
  @Input() nome = '';
}
```

### Exemplo do componente pai

```html
<app-produto [nome]="'Notebook'"></app-produto>
```

Nesse caso:

- o pai envia `'Notebook'`
- o filho recebe esse valor na propriedade `nome`

### Exemplo com mais de um valor

```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-plano',
  template: `
    <h2>{{ titulo }}</h2>
    <p>R$ {{ preco }}</p>
  `
})
export class CardPlanoComponent {
  @Input() titulo = '';
  @Input() preco = 0;
}
```

```html
<app-card-plano
  [titulo]="'Plano Premium'"
  [preco]="150"
></app-card-plano>
```

### Exemplo com alias

Também é possível renomear a entrada no HTML:

```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  template: `<img [src]="url" />`
})
export class AvatarComponent {
  @Input('imagem') url = '';
}
```

```html
<app-avatar [imagem]="'/assets/user.png'"></app-avatar>
```

Resumo:

- `@Input()` recebe dados do componente pai
- a comunicação acontece de pai para filho
- normalmente o valor chega ao filho por property binding

## 18.1 Exemplos rápidos para treinar

### Exemplo de property binding + event binding

```ts
export class ExemploComponent {
  corBotao = 'red';

  trocarCor() {
    this.corBotao = 'green';
  }
}
```

```html
<button [style.background]="corBotao" (click)="trocarCor()">
  Trocar cor
</button>
```

### Exemplo de attribute binding

```ts
export class ExemploComponent {
  descricao = 'Botão de salvar';
}
```

```html
<button [attr.aria-label]="descricao">
  Salvar
</button>
```

### Exemplo de CSS style binding

```ts
export class ExemploComponent {
  corTexto = 'purple';
}
```

```html
<p [style.color]="corTexto">
  Texto com cor dinâmica
</p>
```

### Exemplo de CSS class binding

```ts
export class ExemploComponent {
  destaque = true;
}
```

```html
<p [class.destaque]="destaque">
  Texto com classe dinâmica
</p>
```

### Exemplo de renderização com condição simples

```ts
export class ExemploComponent {
  carregando = true;
}
```

```html
<p>{{ carregando ? 'Carregando...' : 'Conteúdo pronto' }}</p>
```

### Exemplo de objeto no componente

```ts
export class ProdutoComponent {
  produto = {
    nome: 'Curso Angular',
    preco: 120
  };
}
```

```html
<h3>{{ produto.nome }}</h3>
<span>R$ {{ produto.preco }}</span>
```

## 18.2 Decorator `@Output()`

O decorator `@Output()` permite que um componente filho envie eventos para um componente pai.

Em outras palavras:

- o filho dispara um evento
- o pai escuta esse evento no template

Quando usar:

- para avisar o pai que algo aconteceu no filho
- para comunicar clique, cancelamento, seleção ou atualização
- para comunicação de filho para pai

### Sintaxe básica

```ts
@Output() nomeDoEvento = new EventEmitter<TipoDoValor>();
```

### Exemplo do componente filho

```ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-botao-cancelar',
  template: `<button (click)="cancelar()">Cancelar</button>`
})
export class BotaoCancelarComponent {
  @Output() acaoCancelada = new EventEmitter<void>();

  cancelar() {
    this.acaoCancelada.emit();
  }
}
```

### Exemplo do componente pai

```html
<app-botao-cancelar (acaoCancelada)="onCancelar()"></app-botao-cancelar>
```

```ts
export class AppComponent {
  onCancelar() {
    console.log('Acao de cancelamento recebida do filho');
  }
}
```

Nesse caso:

- o filho emite `acaoCancelada`
- o pai captura esse evento com `(acaoCancelada)="onCancelar()"`

### Exemplo enviando valor

```ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-seletor-plano',
  template: `
    <button (click)="selecionar('Básico')">Básico</button>
    <button (click)="selecionar('Premium')">Premium</button>
  `
})
export class SeletorPlanoComponent {
  @Output() planoSelecionado = new EventEmitter<string>();

  selecionar(plano: string) {
    this.planoSelecionado.emit(plano);
  }
}
```

```html
<app-seletor-plano
  (planoSelecionado)="atualizarPlano($event)"
></app-seletor-plano>
```

```ts
export class AppComponent {
  planoAtual = '';

  atualizarPlano(plano: string) {
    this.planoAtual = plano;
  }
}
```

### Exemplo com alias

Também é possível renomear a saída usada no HTML:

```ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-alerta',
  template: `<button (click)="fechar()">Fechar</button>`
})
export class AlertaComponent {
  @Output('fechou') eventoFechar = new EventEmitter<void>();

  fechar() {
    this.eventoFechar.emit();
  }
}
```

```html
<app-alerta (fechou)="onFechou()"></app-alerta>
```

Resumo:

- `@Output()` envia eventos do filho para o pai
- normalmente e usado com `EventEmitter`
- o pai escuta o evento com sintaxe de event binding

## 18.3 Decorator `@Input()` com `get` e `set`

Também posso usar `@Input()` junto com `get` e `set` quando eu quero:

- tratar o valor antes de salvar
- validar o que veio do componente pai
- padronizar formato (ex.: remover espacos)

Ideia principal:

- o `set` roda quando o valor chega do pai
- o `get` devolve o valor tratado para o template ou para a classe

### Exemplo do componente filho

```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-plano',
  template: `
    <h2>{{ titulo }}</h2>
    <p>R$ {{ preco }}</p>
  `
})
export class CardPlanoComponent {
  private _titulo = '';
  private _preco = 0;

  @Input()
  set titulo(valor: string) {
    this._titulo = (valor ?? '').trim();
  }

  get titulo(): string {
    return this._titulo;
  }

  @Input()
  set preco(valor: number) {
    this._preco = valor > 0 ? valor : 0;
  }

  get preco(): number {
    return this._preco;
  }
}
```

### Exemplo do componente pai

```html
<app-card-plano
  [titulo]="'   Plano Premium   '"
  [preco]="-50"
></app-card-plano>
```

Resultado esperado:

- `titulo` chega com espacos, mas no filho fica sem espacos
- `preco` negativo vira `0` pela validação no `set`

Resumo:

- `@Input()` com `set` e útil para validar e transformar valores de entrada
- `get` deixa o acesso ao valor organizado e legível
- essa abordagem ajuda a proteger o componente filho de valores inválidos

## 18.4 Propriedade `transform` do `@Input()`

A propriedade `transform` do `@Input()` permite transformar o valor recebido do componente pai antes de salvar no filho.

Em outras palavras:

- o pai envia o valor
- o Angular aplica a função de transformação
- o componente filho recebe o valor ja tratado

Quando usar:

- para converter string em boolean ou número
- para aplicar valor padrão
- para normalizar dados recebidos (trim, uppercase, etc.)

### Sintaxe básica

```ts
@Input({ transform: minhaFuncao }) propriedade = valorInicial;
```

### Exemplo com transformações prontas do Angular

```ts
import { Component, Input, booleanAttribute, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-filtro',
  template: `
    <p>Ativo: {{ ativo }}</p>
    <p>Limite: {{ limite }}</p>
  `
})
export class FiltroComponent {
  @Input({ transform: booleanAttribute }) ativo = false;
  @Input({ transform: numberAttribute }) limite = 0;
}
```

### Exemplo no componente pai

```html
<app-filtro ativo limite="10"></app-filtro>
```

Nesse caso:

- `ativo` vira `true` por causa do `booleanAttribute`
- `limite` vira `10` (number) por causa do `numberAttribute`

### Exemplo com transformação customizada

```ts
import { Component, Input } from '@angular/core';

function normalizarTitulo(valor: string | null | undefined): string {
  return (valor ?? 'sem titulo').trim().toUpperCase();
}

@Component({
  selector: 'app-card-titulo',
  template: `<h2>{{ titulo }}</h2>`
})
export class CardTituloComponent {
  @Input({ transform: normalizarTitulo }) titulo = 'SEM TITULO';
}
```

```html
<app-card-titulo [titulo]="'   Plano Gold   '"></app-card-titulo>
```

Resultado esperado:

- o filho recebe `PLANO GOLD`, mesmo com espacos enviados pelo pai

Resumo:

- `transform` deixa o `@Input()` mais limpo e declarativo
- evita repetir lógica de tratamento dentro de `set`
- ajuda a padronizar entradas do componente

## 19. Diretivas estruturais: `*ngIf` e `*ngFor`

As diretivas estruturais do Angular permitem modificar a estrutura do DOM, ou seja, adicionar, remover ou repetir elementos na tela.

As mais comuns são:

- `*ngIf`: mostra ou oculta um elemento com base em uma condição
- `*ngFor`: repete um elemento para cada item de uma lista

Essas diretivas usam o asterisco `*` como sintaxe especial porque, por baixo dos panos, o Angular transforma isso em uma `ng-template`.

### Pré-requisito

Para usar `*ngIf` e `*ngFor`, o módulo precisa ter acesso às diretivas básicas do Angular.

Regra prática:

- em feature modules, normalmente isso vem de `CommonModule`
- no módulo raiz, isso já costuma vir por meio de `BrowserModule`

Exemplo em um feature module:

```ts
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule]
})
export class SharedModule {}
```

### Como funciona o asterisco

Quando o Angular vê `*ngIf`, ele interpreta como:

```html
<elemento *ngIf="condicao">Conteúdo</elemento>
```

E transforma internamente em:

```html
<ng-template [ngIf]="condicao">
  <elemento>Conteúdo</elemento>
</ng-template>
```

O mesmo vale para `*ngFor`:

```html
<li *ngFor="let item of lista"> {{ item }} </li>
```

Torna-se:

```html
<ng-template ngFor let-item [ngForOf]="lista">
  <li>{{ item }}</li>
</ng-template>
```

Resumo mental:

- `*` é um açúcar sintático
- por baixo é `ng-template`
- o Angular processa isso antes de renderizar

---

## 19.1 A diretiva `*ngIf`

A diretiva `*ngIf` mostra ou remove um elemento do DOM com base em uma condição booleana.

Diferença principal:

- `display: none` esconde visualmente, mas o elemento continua no DOM
- `*ngIf` remove o elemento do DOM completamente

Quando usar:

- para esconder seções que só devem aparecer em determinadas situações
- para liberar memória quando um componente não é mais necessário
- para evitar renderizar elementos pesados quando não são visíveis

### Sintaxe básica

```html
<elemento *ngIf="condicao">Conteúdo</elemento>
```

### Exemplo simples

```ts
export class AuthComponent {
  autenticado = false;
}
```

```html
<p *ngIf="autenticado">Bem-vindo ao sistema</p>
<p *ngIf="!autenticado">Por favor, faça login</p>
```

### Exemplo com `else`

O Angular permite usar um bloco `else` com `ng-template`.

```ts
export class StatusComponent {
  online = true;
}
```

```html
<p *ngIf="online; else offlineTemplate">Usuário está online</p>

<ng-template #offlineTemplate>
  <p>Usuário está offline</p>
</ng-template>
```

### Exemplo com `then` e `else`

Também é possível usar `then` para definir o bloco verdadeiro e `else` para o bloco falso.

```ts
export class PlanoComponent {
  premium = true;
}
```

```html
<ng-container *ngIf="premium; then planoPremium; else planoBasico"></ng-container>

<ng-template #planoPremium>
  <p>Benefícios do plano Premium</p>
</ng-template>

<ng-template #planoBasico>
  <p>Benefícios do plano Básico</p>
</ng-template>
```

### Exemplo com `as`

O `*ngIf` também pode armazenar o valor em uma variável usando `as`.

```ts
export class UsuarioComponent {
  usuario = { nome: 'Fernanda', role: 'admin' };
}
```

```html
<div *ngIf="usuario as u">
  <p>{{ u.nome }}</p>
  <p>{{ u.role }}</p>
</div>
```

### Exemplo com variáveis implícitas

O Angular disponibiliza algumas variáveis dentro do contexto do `ngIf`:

- `$implicit`: o valor da condição
- `ngIf`: a própria diretiva
- `then`: referência ao bloco then
- `else`: referência ao bloco else

```ts
export class ListaComponent {
  itens: string[] = [];
}
```

```html
<ng-container
  *ngIf="itens.length > 0; then lista; else vazio"
></ng-container>

<ng-template #lista>
  <ul>
    <li *ngFor="let item of itens">{{ item }}</li>
  </ul>
</ng-template>

<ng-template #vazio>
  <p>Nenhum item encontrado</p>
</ng-template>
```

Resumo:

- `*ngIf` remove ou adiciona elementos no DOM
- use `else` com `ng-template` para conteúdo alternativo
- use `as` para armazenar o valor em uma variável
- `ng-container` evita div extra no HTML

---

## 19.2 A diretiva `*ngFor`

A diretiva `*ngFor` repete um elemento para cada item de uma lista.

Diferença principal:

- `for` itera sobre uma coleção
- cada repetição gera uma nova instância do elemento no DOM

Quando usar:

- para listar produtos, usuários, tarefas e similares
- para criar listas dinâmicas baseadas em dados do componente
- para renderizar menus, tabelas e cards em loop

### Sintaxe básica

```html
<elemento *ngFor="let item of lista">{{ item }}</elemento>
```

### Exemplo simples com array de strings

```ts
export class CursoComponent {
  cursos = ['Angular', 'TypeScript', 'RxJS'];
}
```

```html
<ul>
  <li *ngFor="let curso of cursos">{{ curso }}</li>
</ul>
```

Resultado no DOM:

```html
<li>Angular</li>
<li>TypeScript</li>
<li>RxJS</li>
```

### Exemplo com array de objetos

```ts
export class ProdutoComponent {
  produtos = [
    { nome: 'Notebook', preco: 3500 },
    { nome: 'Mouse', preco: 80 },
    { nome: 'Teclado', preco: 200 }
  ];
}
```

```html
<div *ngFor="let produto of produtos">
  <p>{{ produto.nome }} - R$ {{ produto.preco }}</p>
</div>
```

### Exemplo com índice

O Angular disponibiliza a variável `index` dentro do contexto do `ngFor`.

```ts
export class ListaComponent {
  frutas = ['Maçã', 'Banana', 'Uva'];
}
```

```html
<ul>
  <li *ngFor="let fruta of frutas; let i = index">
    {{ i + 1 }} - {{ fruta }}
  </li>
</ul>
```

Resultado:

```html
<li>1 - Maçã</li>
<li>2 - Banana</li>
<li>3 - Uva</li>
```

### Exemplo com `trackBy`

O `trackBy` ajuda o Angular a identificar quais itens mudaram, otimizando a re-renderização.

```ts
export class CatalogoComponent {
  produtos = [
    { id: 1, nome: 'Camisa' },
    { id: 2, nome: 'Calça' },
    { id: 3, nome: 'Sapato' }
  ];

  trackById(index: number, produto: any): number {
    return produto.id;
  }
}
```

```html
<div *ngFor="let produto of produtos; trackBy: trackById">
  <p>{{ produto.nome }}</p>
</div>
```

Quando a lista for atualizada:

- sem `trackBy`: o Angular recria todos os elementos
- com `trackBy`: o Angular recria apenas os que realmente mudaram

### Exemplo com `first` e `last`

O Angular disponibiliza `first` e `last` para identificar o primeiro e último item.

```ts
export class MenuComponent {
  itens = ['Home', 'Sobre', 'Contato'];
}
```

```html
<ul>
  <li *ngFor="let item of itens; let primeiro = first; let ultimo = last"
      [class.primeiro]="primeiro"
      [class.ultimo]="ultimo">
    {{ item }}
  </li>
</ul>
```

```scss
.primeiro {
  border-top: 1px solid #ccc;
}

.ultimo {
  border-bottom: 1px solid #ccc;
}
```

### Exemplo com `even` e `odd`

O Angular disponibiliza `even` e `odd` para identificar itens pares e ímpares.

```ts
export class TabelaComponent {
  usuarios = ['Ana', 'Bruno', 'Carla', 'Daniel'];
}
```

```html
<tr *ngFor="let usuario of usuarios; let par = even"
    [class.linha-par]="par">
  <td>{{ usuario }}</td>
</tr>
```

### Exemplo de `NgFor` com componente filho

Um uso muito comum do `*ngFor` e repetir um componente filho em vez de repetir HTML puro.

Nesse formato:

- o componente pai percorre a lista
- cada item da lista vira uma instancia do componente filho
- o pai envia dados com `@Input()`
- o filho devolve acoes com `@Output()`

### Exemplo no componente pai

```ts
export class AppComponent {
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
```

```html
<div class="list">
  <app-person
    *ngFor="let person of listPeople;
    let i = index;
    let isOdd = odd;
    let isFirst = first;
    let isLast = last;"
    [personName]="person.name"
    [personAge]="person.age"
    [personIndex]="i"
    [isOdd]="isOdd"
    [isFirst]="isFirst"
    [isLast]="isLast"
    [isSelected]="personSelectedIndex === i"
    (personSelected)="selectPerson($event)"
  ></app-person>
</div>
```

### Exemplo no componente filho

```ts
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-person',
  templateUrl: './person.html',
  styleUrl: './person.scss',
})
export class Person {
  @Input({ required: true }) personName = '';
  @Input({ required: true }) personAge = 0;
  @Input({ required: true }) personIndex = 0;
  @Input({ required: true }) isOdd = false;
  @Input({ required: true }) isFirst = false;
  @Input({ required: true }) isLast = false;
  @Input({ required: true }) isSelected = false;

  @Output() personSelected = new EventEmitter<number>();

  onPersonSelected() {
    this.personSelected.emit(this.personIndex);
  }
}
```

```html
<div class="item"
  [class.item--odd]="isOdd"
  [class.item--highlighted]="isSelected"
  (click)="onPersonSelected()"
>
  <p class="item__name">{{ personIndex }} - {{ personName }}</p>
  <p class="item__age">{{ personAge }} anos</p>
  <p class="item__age" *ngIf="isFirst">E o primeiro</p>
  <p class="item__age" *ngIf="isLast">E o ultimo</p>
</div>
```

O que esse exemplo ensina:

- `*ngFor` pode repetir componentes completos, nao apenas tags HTML simples
- `index`, `odd`, `first` e `last` podem ser repassados para o filho
- o estado de selecao continua controlado no pai
- o filho fica responsavel apenas por exibir dados e emitir eventos
- isso deixa a tela mais organizada e o componente mais reutilizavel

Resumo:

- `*ngFor` repete elementos no DOM
- use `index` para numerar ou identificar posições
- use `trackBy` para otimizar re-renderizações
- use `first`, `last`, `even`, `odd` para estilizar itens específicos

---

## 19.3 Combinando `*ngIf` e `*ngFor`

É comum precisar usar as duas diretivas juntas.

### Exemplo: lista com verificação de conteúdo

```ts
export class ListaProdutosComponent {
  produtos: any[] = [];
}
```

```html
<div *ngIf="produtos.length > 0; else semProdutos">
  <div *ngFor="let produto of produtos">
    <p>{{ produto.nome }}</p>
  </div>
</div>

<ng-template #semProdutos>
  <p>Nenhum produto cadastrado</p>
</ng-template>
```

### Exemplo: mostrar detalhes ao clicar

```ts
export class DetalhesComponent {
  itens = [
    { id: 1, titulo: 'Angular', detalhes: 'Framework completo' },
    { id: 2, titulo: 'TypeScript', detalhes: 'Superset do JavaScript' }
  ];

  itemSelecionado: any = null;

  selecionar(item: any) {
    this.itemSelecionado = item;
  }
}
```

```html
<div *ngFor="let item of itens">
  <h3 (click)="selecionar(item)">{{ item.titulo }}</h3>
  <p *ngIf="itemSelecionado === item">{{ item.detalhes }}</p>
</div>
```

Resumo:

- combine as diretivas para criar interfaces dinâmicas
- `ng-container` evita divs extras quando não precisa de wrapper
- use `*ngIf` dentro de `*ngFor` para mostrar detalhes condicionais

---

## 19.4 Diferença entre `*ngIf` e `[style.display]` ou `[hidden]`

É importante entender quando usar cada abordagem:

| Abordagem | Remove do DOM? | Uso de memória | Inicialização |
|-----------|---------------|----------------|---------------|
| `*ngIf` | Sim | Não aloca | Recria ao aparecer |
| `[hidden]` | Não | Aloca (esconde) | Pronto para mostrar |
| `[style.display]` | Não | Aloca (esconde) | Pronto para mostrar |

### Exemplo com `[hidden]`

```ts
export class TabComponent {
  tabAtiva = 1;
}
```

```html
<div [hidden]="tabAtiva !== 1">Conteúdo da aba 1</div>
<div [hidden]="tabAtiva !== 2">Conteúdo da aba 2</div>
```

### Quando usar cada um

- use `*ngIf` quando o elemento for pesado e só precisar existir em certos momentos
- use `[hidden]` quando o elemento for leve e precise aparecer rapidamente
- prefira `*ngIf` para condições de autenticação, permissões e estados críticos

Resumo:

- `*ngIf`: remove completamente o elemento
- `[hidden]`: esconde visualmente, mas mantém no DOM
- escolha com base em performance e necessidade de memória

---

## 19.5 `ng-container` e `ng-template`

Esses dois elementos são especiais no Angular.

### `ng-container`

- não gera elemento no DOM
- serve como wrapper sem adicionar tags extras
- útil quando precisa de `*ngIf` ou `*ngFor` sem mudar o HTML

```html
<table>
  <tr *ngFor="let usuario of usuarios">
    <ng-container *ngIf="usuario.ativo">
      <td>{{ usuario.nome }}</td>
      <td>{{ usuario.email }}</td>
    </ng-container>
  </tr>
</table>
```

Sem `ng-container`, teria uma `div` extra dentro de `tr`, o que quebraria a tabela.

### `ng-template`

- não renderiza nada por padrão
- só aparece quando referenciado explicitamente
- usado com `*ngIf`, `else`, `then` ou manualmente via `ViewChild`

```html
<ng-template #loading>
  <p>Carregando...</p>
</ng-template>

<div *ngIf="carregando; else loading">
  <p>Dados carregados</p>
</div>
```

Resumo:

- `ng-container`: wrapper sem tag no DOM
- `ng-template`: conteúdo que só aparece quando chamado
- use `ng-container` para evitar divs extras em loops e condições

---

## 20. O que este projeto praticou

Com base no código e nos comentários, este projeto abordou:

- criação de componentes
- uso de módulos
- declaração, importação e exportação
- property binding
- event binding
- vinculação em duas vias com `[(ngModel)]`
- interpolação
- tipagem com interfaces
- estilos globais e locais
- encapsulamento de estilos
- `:host`
- `::ng-deep`
- Shadow DOM
- SCSS com variáveis
- integração com Angular Material
- composição de componentes
- `@Input()`
- propriedade `transform` do `@Input()`
- `@Output()`
- `*ngIf`
- `*ngFor`
- `ng-container`
- `ng-template`

### Exemplo integrando vários conceitos

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.scss']
})
export class ResumoComponent {
  plano = {
    nome: 'Premium',
    preco: 150
  };

  ativo = true;
  descricao = 'Botão de cancelamento';
  corStatus = 'green';
  destaque = true;

  desativarPlano() {
    this.ativo = false;
    this.corStatus = 'red';
    this.destaque = false;
  }
}
```

```html
<div class="card" [class.destaque]="destaque">
  <h2>{{ plano.nome }}</h2>
  <p>R$ {{ plano.preco }}</p>
  <span [style.color]="corStatus">Status visual</span>

  <button
    [disabled]="!ativo"
    [attr.aria-label]="descricao"
    (click)="desativarPlano()"
  >
    Cancelar
  </button>
</div>
```

Nesse exemplo aparecem:

- componente
- interpolação
- vinculação de propriedade
- vinculação de atributo
- vinculação de estilo
- vinculação de classe
- vinculação de evento
- organização entre classe e template

## 21. Resumo rápido para revisão

Se eu precisasse revisar este projeto rapidamente, eu lembraria:

- `[]` envia valor da classe para o template
- `[attr.x]` envia valor para um atributo HTML
- `[style.x]` envia valor para um estilo CSS inline
- `[class.x]` ativa ou remove uma classe CSS
- `()` escuta evento do template
- `[(ngModel)]` cria vinculação em duas vias entre template e classe
- `{{ }}` exibe valor no HTML
- `@Input()` recebe valor do componente pai
- `@Output()` emite evento do filho para o pai
- `declarations` registra componentes do módulo
- `imports` traz módulos necessários
- `exports` libera componentes para outros módulos
- `template` e `styles` servem para definições inline
- `templateUrl` e `styleUrls` servem para arquivos separados
- `styles.scss` é global
- SCSS do componente é local, dependendo da encapsulação
- `ViewEncapsulation.None` globaliza estilos
- `ViewEncapsulation.Emulated` isola parcialmente
- `ViewEncapsulation.ShadowDom` isola com Shadow DOM real
- `:host` aponta para o componente atual
- `::ng-deep` atravessa encapsulamento

### Exemplo-relâmpago de revisão

```ts
export class RevisaoComponent {
  nome = 'Angular';
  bloqueado = false;
  descricao = 'Botão principal';
  cor = 'blue';
  destaque = true;

  bloquear() {
    this.bloqueado = true;
    this.cor = 'gray';
    this.destaque = false;
  }
}
```

```html
<h1 [class.destaque]="destaque">{{ nome }}</h1>
<p [style.color]="cor">Estado visual</p>
<button
  [disabled]="bloqueado"
  [attr.aria-label]="descricao"
  (click)="bloquear()"
>
  Bloquear
</button>
```

Revisão do que aparece aqui:

- `{{ nome }}`: interpolação
- `[disabled]`: vinculação de propriedade
- `[attr.aria-label]`: vinculação de atributo
- `[style.color]`: vinculação de estilo CSS
- `[class.destaque]`: vinculação de classe CSS
- `(click)`: vinculação de evento

## 22. Próximos assuntos para continuar estudando

Depois do que foi visto aqui, a sequência mais natural de estudo seria:

1. ciclo de vida dos componentes (`ngOnInit`, `ngOnChanges`, `ngOnDestroy`)
2. validações de formulário (template-driven e reativo)
3. serviços e injeção de dependência
4. rotas
5. formulários reativos
6. consumo de API com `HttpClient`
7. comunicação entre componentes com serviços e estado compartilhado

Alguns exemplos abaixo retomam conceitos já vistos e também antecipam assuntos que costumam aparecer na sequência do estudo.

### Exemplo de `@Input()`

```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-produto',
  template: `<p>{{ nome }}</p>`
})
export class ProdutoComponent {
  @Input() nome = '';
}
```

```html
<app-produto [nome]="'Notebook'"></app-produto>
```

### Exemplo de `@Output()`

```ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-acao',
  template: `<button (click)="executar()">Executar</button>`
})
export class AcaoComponent {
  @Output() executou = new EventEmitter<void>();

  executar() {
    this.executou.emit();
  }
}
```

```html
<app-acao (executou)="onExecutou()"></app-acao>
```

### Exemplo de `*ngIf`

```ts
export class ExemploIfComponent {
  logado = true;
}
```

```html
<p *ngIf="logado">Usuário autenticado</p>
```

### Exemplo de `*ngFor`

```ts
export class ExemploForComponent {
  cursos = ['Angular', 'TypeScript', 'RxJS'];
}
```

```html
<li *ngFor="let curso of cursos">
  {{ curso }}
</li>
```

### Exemplo de vinculação em duas vias com `[(ngModel)]`

```ts
export class ExemploModelComponent {
  nome = '';
}
```

```html
<input [(ngModel)]="nome" />
<p>{{ nome }}</p>
```

### Exemplo de serviço

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  getNome() {
    return 'Fernanda';
  }
}
```

### Exemplo de rota

```ts
const routes = [
  { path: 'home', component: HomeComponent },
  { path: 'perfil', component: PerfilComponent }
];
```

```html
<a routerLink="/home">Home</a>
<router-outlet></router-outlet>
```

### Exemplo de formulário reativo

```ts
import { FormControl, FormGroup } from '@angular/forms';

export class CadastroComponent {
  formulario = new FormGroup({
    nome: new FormControl('')
  });
}
```

### Exemplo com `HttpClient`

```ts
import { HttpClient } from '@angular/common/http';

export class ApiComponent {
  constructor(private http: HttpClient) {}

  carregarUsuarios() {
    return this.http.get('/api/usuarios');
  }
}
```

