import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {
  @Input() label: string = '';
  @Input() progress: number = 0;
  @Input() colorsHex: string[] = ['#FF0000', '#FFFF00', '#0000FF', '#00FF00'];

  get progressColor(): string {
    const thresholds = [25, 50, 75, 100];
    for (let i = 0; i < thresholds.length; i++) {
      if (this.progress <= thresholds[i]) {
        return this.colorsHex[i];
      }
    }
    return this.colorsHex[this.colorsHex.length - 1];
  }
}
