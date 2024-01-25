import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlbumService } from '../album.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginate.component.html',
  styleUrl: './paginate.component.css',
})
export class PaginateComponent implements OnInit {
  @Output() setPaginate: EventEmitter<{ start: number; end: number }> =
    new EventEmitter();

  /** set of numbers to be displayed for pagination */
  pages: number[] = [];
  /** number album(s) that will be displayed per page */
  perPage: number;
  /** total number of albums */
  total: number = 0;
  /** number of pagination pages (max number) */
  numberPages: number = 0;
  /** current page number */
  currentPage!: number;

  constructor(private albumService: AlbumService) {
    this.perPage = this.albumService.paginateNumberPage();
  }

  ngOnInit(): void {
    this.init();
  }

  /**
   * Init the pagination
   * @param page
   */
  init(page: number = 1) {
    this.total = this.albumService.count();
    this.numberPages = Math.ceil(this.total / this.perPage);
    this.currentPage = page;
    this.pages = [];
    for (let i = 1; i <= this.numberPages; ++i) {
      this.pages.push(i);
    }
  }

  selectedPage(page: number) {
    this.currentPage = page;
    this.setPaginate.emit(this.paginate(page));
    this.albumService.currentPage(this.currentPage); // mettre à jour les autres components qui souscrivent
  }

  next() {
    if (this.currentPage >= this.numberPages) {
      this.currentPage = 1;
    } else {
      this.currentPage++;
    }
    this.setPaginate.emit(this.paginate(this.currentPage));
    this.albumService.currentPage(this.currentPage); // mettre à jour les autres components qui souscrivent
  }
  prev() {
    if (this.currentPage <= 1) {
      this.currentPage = this.numberPages;
    } else {
      this.currentPage--;
    }
    this.setPaginate.emit(this.paginate(this.currentPage));
    this.albumService.currentPage(this.currentPage); // mettre à jour les autres components qui souscrivent
  }

  paginate(page: number) {
    let start = (page - 1) * this.perPage; // 0 2
    let end = start + this.perPage; // 2 4

    return { start, end };
  }
}
