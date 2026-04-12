import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'NgClass';
  isHighlighted = true;
  isRounded = true;
  currentStatus: 'success' | 'warning' = 'success';

  toggleHighlight() {
    this.isHighlighted = !this.isHighlighted;
  }

  toggleRounded() {
    this.isRounded = !this.isRounded;
  }

  toggleStatus() {
    this.currentStatus = this.currentStatus === 'success' ? 'warning' : 'success';
  }
}
