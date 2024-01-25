import { Injectable } from '@angular/core';
import { Album, List } from './album';
import { ALBUMS, ALBUM_LISTS } from './mock-albums';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private _albums: Album[] = ALBUMS; // _ convention private et protected
  private _albumList: List[] = ALBUM_LISTS;
  sendCurrentNumberPage = new Subject<number>();

  constructor() {}

  getAlbums(): Album[] {
    return this._albums.sort((a, b) => b.duration - a.duration);
  }

  getAlbum(id: string): Album | undefined {
    return this._albums.find((album) => album.id === id);
  }

  getAlbumList(id: string): List | undefined {
    return this._albumList.find((list) => list.id === id);
  }

  count(): number {
    return this._albums.length;
  }

  paginate(start: number, end: number): Album[] {
    // utilisez la méthode slice pour la pagination
    return this.getAlbums().slice(start, end);
  }

  search(word: string): Album[] {
    let re = new RegExp(word.trim(), 'gi');

    return this._albums.filter(
      (album) => album.title.match(re) && album.title.match(re)
    );
  }

  /**
   * Fonction that determines how many albums will be display per page
   * @returns number of albums per page
   */
  paginateNumberPage(): number {
    if (typeof environment.numberPage === 'undefined') {
      throw "Attention la pagination n'est pas définie";
    }
    return environment.numberPage;
  }

  currentPage(numberPage: number) {
    return this.sendCurrentNumberPage.next(numberPage);
  }
}
