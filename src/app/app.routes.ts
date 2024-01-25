import { Routes } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';

export const routes: Routes = [
    {
        path: 'albums',
        component: AlbumsComponent
    },
    {
        path: '',
        redirectTo: '/albums',
        pathMatch: 'full'
    },
    // {
    //     path: 'login',
    //     component: LoginComponent,
    // },
    // {
    //     path: 'album/:id',
    //     component: AlbumDescriptionComponent,
    // }
];
