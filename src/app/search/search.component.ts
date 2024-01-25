import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  constructor(private albumService: AlbumService) { }

  onSubmit(formSearch: NgForm) {
    console.log(this.albumService.search(formSearch.value['search']))
  }
}
