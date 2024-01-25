import { Component } from '@angular/core';
import { Album } from '../album';
import { ALBUMS } from '../mock-albums';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AlbumDetailsComponent } from '../album-details/album-details.component';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, MatIconModule, AlbumDetailsComponent],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css',
})
export class AlbumsComponent {
  titlePage: string = 'Page principale Album Music';
  albums: Album[] = ALBUMS;
  selectedAlbum?: Album;

  onSelect(album: Album) {
    this.selectedAlbum = album;
  }
}
