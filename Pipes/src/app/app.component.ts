import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  //text = 'Felipe';
  pessoa = {
    name: 'Felipe',
    status: 1,
  };

  pessoa2 = {
    name: 'Sandro',
    status: 2,
  };

  pessoa3 = {
    name: 'Elidio',
    status: 3,
  };

  getStyle(status: number) {
    return {
      active: status == 1,
      partial: status == 2,
      blocked: status == 3,
    };
  }
}
