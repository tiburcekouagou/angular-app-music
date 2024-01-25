import { Component } from '@angular/core';
import { Album } from '../album';
import { ALBUMS } from '../mock-albums';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css',
})
export class AlbumsComponent {
  titlePage: string = 'Page principale Album Music';
  albums: Album[] = ALBUMS;
}
