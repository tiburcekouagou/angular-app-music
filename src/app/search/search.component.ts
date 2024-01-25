import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AlbumService } from '../album.service';
import { Album } from '../album';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() searchAlbums: EventEmitter<Album[]> = new EventEmitter(); // emission des donnees

  constructor(private albumService: AlbumService) { }

  onSubmit(formSearch: NgForm) {
    const results = this.albumService.search(formSearch.value['search']);
    if (results.length > 0) {
      this.searchAlbums.emit(results);
    }
  }

}
