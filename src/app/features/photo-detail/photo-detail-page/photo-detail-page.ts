import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { FavoritesService } from '../../../core/services/favorites';

@Component({
  selector: 'app-photo-detail-page',
  imports: [MatButtonModule],
  templateUrl: './photo-detail-page.html',
  styleUrl: './photo-detail-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly favoritesService = inject(FavoritesService);

  private readonly photoId =
    this.route.snapshot.paramMap.get('id');

  readonly photo = computed(() => {
    if (!this.photoId) {
      return undefined;
    }

    return this.favoritesService.getById(this.photoId);
  });

  removeFromFavorites(): void {
    if (!this.photoId) {
      return;
    }

    this.favoritesService.remove(this.photoId);

    void this.router.navigate(['/favorites']);
  }
}