import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';
import { Observable, interval, take, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, AlbumsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'angular-app-music';

  timerObservable!: Observable<string>; // !: opérateur de confiance | opérateur d'affirmation de non nullité
  count?: string = 'Time: 00 h 00 min 00 s';

  constructor() {}

  ngOnInit(): void {
    this.timerObservable = interval(1000).pipe(
      take(3600 * 12),
      map((num) => {
        const hours = Math.floor(num / 3600);
        const minutes = Math.floor(num / 60);
        return `Time: ${this.format(hours)} h ${this.format(
          minutes - hours * 60
        )} min ${this.format(num - minutes * 60)} s`;
      })
    );

    this.timerObservable.subscribe((time) => (this.count = time));
  }

  format(num: number): string {
    return (num < 10 ? '0' : '') + num;
  }
}
