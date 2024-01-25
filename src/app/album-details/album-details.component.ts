import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Album, List } from '../album';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AlbumService } from '../album.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album-details',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './album-details.component.html',
  styleUrl: './album-details.component.css',
})
export class AlbumDetailsComponent implements OnInit, OnChanges {
  @Input() album?: Album;
  @Output() onPlay: EventEmitter<Album> = new EventEmitter();

  albumLists: List[] = [];
  songs: string[] = [];

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.album) {
      const selectedList = this.albumService.getAlbumList(this.album.id);
      this.songs = selectedList?.list || [];
    }
  }

  play(album: Album) {
    this.onPlay.emit(album);
    this.albumService.subjectAlbum.next(album);
  }
}
