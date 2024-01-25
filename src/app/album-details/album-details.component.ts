import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Album, List } from '../album';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { ALBUM_LISTS } from '../mock-albums';

@Component({
  selector: 'app-album-details',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './album-details.component.html',
  styleUrl: './album-details.component.css'
})
export class AlbumDetailsComponent implements OnChanges {
  @Input() album?: Album;
  @Output() onPlay: EventEmitter<Album> = new EventEmitter();

  albumLists: List[] = ALBUM_LISTS;
  songs: string[] = [];


  ngOnChanges(): void {
    if (this.album) {
      const selectedList = this.albumLists.find(elem => elem.id === this.album?.id);
      this.songs = selectedList?.list || [];
    }
  }

  play(album: Album) {
    this.onPlay.emit(album);
  }
}
