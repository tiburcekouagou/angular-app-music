import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../album';
import { AlbumService } from '../album.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-album-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album-description.component.html',
  styleUrl: './album-description.component.css',
})
export class AlbumDescriptionComponent implements OnInit {
  album?: Album;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    // récupérer l'identifiant
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.albumService.getAlbum(id).subscribe((alb) => (this.album = alb));
    }
  }
}
