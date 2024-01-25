import { Component, OnInit } from '@angular/core';
import { Album } from '../album';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AlbumDetailsComponent } from '../album-details/album-details.component';
import { AlbumService } from '../album.service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, MatIconModule, AlbumDetailsComponent, SearchComponent],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css',
})
export class AlbumsComponent implements OnInit {
  titlePage: string = 'Page principale Album Music';
  albums!: Album[];
  selectedAlbum?: Album;
  /** Variable pour gérer l'affichage des de l'album en cours de lecture */
  status?: string;

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    // this.albums = this.albumService.getAlbums();
    this.albums = this.albumService.paginate(0, 5);
  }

  onSelect(album: Album) {
    this.selectedAlbum = album;
  }

  playParent(e: Album) {
    this.status = e.id;
  }

  search(searchAlbums: Album[]) {
    if (searchAlbums) this.albums = searchAlbums;
  }

  onChangeEmit(album: Album[]) {
    if (album) this.albums = album;
  }

}
