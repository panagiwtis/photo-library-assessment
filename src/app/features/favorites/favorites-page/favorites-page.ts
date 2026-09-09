import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { Router } from '@angular/router';

import { FavoritesService } from '../../../core/services/favorites';
import { Photo } from '../../../shared/models/photo.model';
import { PhotoGrid } from '../../../shared/components/photo-grid/photo-grid';

@Component({
  selector: 'app-favorites-page',
  imports: [PhotoGrid],
  templateUrl: './favorites-page.html',
  styleUrl: './favorites-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesPage {
  private readonly favoritesService = inject(FavoritesService);
  private readonly router = inject(Router);

  readonly favorites = this.favoritesService.favorites;

  onPhotoSelected(photo: Photo): void {
    void this.router.navigate(['/photos', photo.id]);
  }
}