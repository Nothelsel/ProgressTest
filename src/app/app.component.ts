import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProgressBarComponent } from "./components/progress-bar/progress-bar.component";

interface ProgressBar {
  label: string;
  value: number;
  colorsHex: string[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, ProgressBarComponent]
})

export class AppComponent {
  title = 'ProgressTest';
  realisationDate = new Date(2024, 1, 31) // 31/01/2024
  activeBarIndex: number | null = null;
  progressBars: ProgressBar[] = [
    { label: 'Initialisation du test technique', value: 50, colorsHex: ['#7160E8', '#60ADE8', '#60E8B6', '#30DB63'] },
    { label: 'Avancement de la phase de développement', value: 25, colorsHex: ['#7160E8', '#60ADE8', '#60E8B6', '#30DB63'] },
  ];

  // select a progress bar by index with the click event
  selectBar(index: number): void {
    if (index >= 0 && index < this.progressBars.length) {
      this.activeBarIndex = index;
    } else {
      console.error(`Index ${index} is out of bounds.`);
    }
  }

  // select all progress bars
  selectAll(): void {
    this.activeBarIndex = null;
  }

  // add a new progress bar
  addProgressBar(): void {
    this.progressBars.push({ label: 'Nouvelle barre de progression', value: 0, colorsHex: ['#7160E8', '#60ADE8', '#60E8B6', '#30DB63'] });
  }

  // delete a progress bar by index
  deleteBar(index: number): void {
    if (index >= 0 && index < this.progressBars.length) {
      this.progressBars.splice(index, 1);
      if (this.activeBarIndex === index) {
        this.activeBarIndex = null;
      }
    } else {
      console.error(`Index ${index} is out of bounds.`);
    }
  }

  // update the value of the selected progress bar or all progress bars
  updateProgress(updateFn: (value: number) => number): void {
    if (this.activeBarIndex === null) {
      this.progressBars = this.progressBars.map(bar => ({
        ...bar,
        value: updateFn(bar.value)
      }));
    } else if (this.activeBarIndex >= 0 && this.activeBarIndex < this.progressBars.length) {
      let bar = this.progressBars[this.activeBarIndex];
      bar.value = updateFn(bar.value);
      this.progressBars[this.activeBarIndex] = bar;
    } else {
      console.error(`Active bar index ${this.activeBarIndex} is out of bounds.`);
    }
  }

  //change the value of the selected progress bar or all progress bars
  changeProgress(step: number): void {
    this.updateProgress(value => Math.max(0, Math.min(100, value + step)));
  }

  //reset the value of the selected progress bar or all progress bars
  resetProgress(): void {
    this.updateProgress(() => 0);
  }
}
