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

## 5. Property Binding

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

## 5.1 Attribute Binding

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

## 5.2 CSS Style Binding

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

## 5.3 CSS Class Binding

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

## 18. O que este projeto praticou

Com base no código e nos comentários, este projeto abordou:

- criação de componentes
- uso de módulos
- declaração, importação e exportação
- property binding
- event binding
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
- property binding
- attribute binding
- style binding
- class binding
- event binding
- organização entre classe e template

## 19. Resumo rápido para revisão

Se eu precisasse revisar este projeto rapidamente, eu lembraria:

- `[]` envia valor da classe para o template
- `[attr.x]` envia valor para um atributo HTML
- `[style.x]` envia valor para um estilo CSS inline
- `[class.x]` ativa ou remove uma classe CSS
- `()` escuta evento do template
- `{{ }}` exibe valor no HTML
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
- `[disabled]`: property binding
- `[attr.aria-label]`: attribute binding
- `[style.color]`: CSS style binding
- `[class.destaque]`: CSS class binding
- `(click)`: event binding

## 20. Próximos assuntos para continuar estudando

Depois do que foi visto aqui, a sequência mais natural de estudo seria:

1. `@Input()` e `@Output()`
2. `*ngIf`, `*ngFor` e diretivas estruturais
3. two-way binding com `[(ngModel)]`
4. serviços e injeção de dependência
5. rotas
6. formulários reativos
7. consumo de API com `HttpClient`

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

### Exemplo de two-way binding com `[(ngModel)]`

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
