import { Component, OnInit } from '@angular/core';
import { Album } from '../album';
import { AlbumService } from '../album.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.css',
})
export class AudioPlayerComponent implements OnInit {
  /** Hide and Show the component */
  showPlayer: boolean = false;
  /** The played album */
  playedAlbum!: Album;
  /** The total number of songs in the albums */
  total: number = 1;
  /** The number of the currently played song */
  currentSongNumber: number = 1;
  /** The percentage corresponding to each song in the album */
  ratio: number = 0;
  count = 0;

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService.subjectAlbum.subscribe((alb) => {
      this.playedAlbum = alb;
      // show the component
      this.showPlayer = true;
      // the current song is #1
      this.currentSongNumber = 1;
      let duration: number = this.playedAlbum.duration;
      this.total = Math.floor(duration / 120);

      this.ratio = 100 / duration;

      /** variable representing the percentage to add after each song */
      let step = this.ratio;

      const intervalId = setInterval(() => {
        this.count++;
        if (this.count % 120 === 0) this.currentSongNumber++;
        this.ratio += step;
        if (this.ratio > 100) {
          clearInterval(intervalId);
          this.showPlayer = false;
          this.albumService.switchOff(this.playedAlbum);
        }
      }, 1000);
    });
  }
}
