import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/photos/photos-page/photos-page')
        .then((m) => m.PhotosPage),
    title: 'Photos'
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./features/favorites/favorites-page/favorites-page')
        .then((m) => m.FavoritesPage),
    title: 'Favorites'
  },
  {
    path: 'photos/:id',
    loadComponent: () =>
      import('./features/photo-detail/photo-detail-page/photo-detail-page')
        .then((m) => m.PhotoDetailPage),
    title: 'Photo'
  },
  {
    path: '**',
    redirectTo: ''
  }
];