import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'NgStyle';
  isHighlighted = true;
  fontSize = 18;
  backgroundColor = '#dbeafe';

  toggleHighlight() {
    this.isHighlighted = !this.isHighlighted;
    this.backgroundColor = this.isHighlighted ? '#dbeafe' : '#f3f4f6';
  }

  increaseFont() {
    this.fontSize += 2;
  }
}
