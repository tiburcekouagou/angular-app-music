import { Injectable } from '@angular/core';
import { Album, List } from './album';
import { ALBUMS, ALBUM_LISTS } from './mock-albums';
import { environment } from '../environments/environment';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { db } from './firebase';
import { DataSnapshot, onValue, ref } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  // private _albums: Album[] = ALBUMS; // _ convention private et protected
  // private _albumList: List[] = ALBUM_LISTS;
  sendCurrentNumberPage = new Subject<number>();

  subjectAlbum = new Subject<Album>();
  subjectAlbums = new Subject<Album[]>();

  constructor(private http: HttpClient) {}

  getAlbums(): Observable<Album[]> {
    const albumsRef = ref(db, 'albums');

    return new Observable<Album[]>((observer) => {
      const callback = (snapshot: DataSnapshot) => {
        const data = snapshot.val() as Album[] | null;

        if (data) {
          const sortedAlbums = data.sort((a, b) => b.duration - a.duration);
          observer.next(sortedAlbums);
        } else {
          // If no data, send an empty array
          observer.next([]);
        }
      };

      // Attach the listener
      const unsubscribe = onValue(albumsRef, callback);

      // Return a function to unsubscribe when the observer is unsubscribed
      return () => {
        // Detach the listener when the observable is unsubscribed
        unsubscribe();
      };
    });
  }

  getAlbum(id: string): Observable<Album | undefined> {
    const albumRef = ref(db, 'albums/' + id);

    return new Observable<Album | undefined>((observer) => {
      const callback = (snapshot: DataSnapshot) => {
        const data = snapshot.val() as Album | null;
        if (data) {
          observer.next(data);
        } else {
          observer.next(undefined);
        }
      };

      // Attach the listener
      const unsubscribe = onValue(albumRef, callback);
      // Return a function to unsubscribe when the observer is unsuscribed
      return () => {
        // Detach the listener when the observable is unsubscribed
        unsubscribe();
      };
    });
  }

  getAlbumList(id: string): Observable<List | undefined> {
    const albumListRef = ref(db, 'albumList/' + id);

    return new Observable<List | undefined>((observer) => {
      const callback = (snapshot: DataSnapshot) => {
        const data = snapshot.val() as List | null;
        if (data) {
          observer.next(data);
        } else {
          observer.next(undefined);
        }
      };

      // Attach the listener
      const unsubscribe = onValue(albumListRef, callback);
      // Return a function to unsubscribe when the observer is unsuscribed
      return () => {
        // Detach the listener when the observable is unsubscribed
        unsubscribe();
      };
    });
  }

  count(): Observable<number> {
    return this.getAlbums().pipe(map((albums) => albums.length));
    // return this._albums.length;
  }

  paginate(start: number, end: number): Observable<Album[]> {
    // utilisez la méthode slice pour la pagination
    return this.getAlbums().pipe(map((albums) => albums.slice(start, end)));
  }

  search(word: string): Observable<Album[]> {
    let re = new RegExp(word.trim(), 'gi');

    return this.getAlbums().pipe(
      map((albums) =>
        albums.filter((album) => album.title.match(re) && album.title.match(re))
      )
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

  switchOff(album: Album): void {
    album.status = 'off';
  }

  switchOn(album: Album): void {
    album.status = 'on';
  }
}
