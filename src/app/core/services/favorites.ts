import {
  inject,
  Injectable,
  PLATFORM_ID,
  signal
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Photo } from '../../shared/models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'photo-library-favorites';

  private readonly favoritesState = signal<Photo[]>(
    this.loadFavorites()
  );

  readonly favorites = this.favoritesState.asReadonly();

  add(photo: Photo): void {
    if (this.isFavorite(photo.id)) {
      return;
    }

    this.favoritesState.update((favorites) => [
      ...favorites,
      photo
    ]);

    this.persist();
  }

  remove(id: string): void {
    this.favoritesState.update((favorites) =>
      favorites.filter((photo) => photo.id !== id)
    );

    this.persist();
  }

  isFavorite(id: string): boolean {
    return this.favoritesState().some(
      (photo) => photo.id === id
    );
  }

  getById(id: string): Photo | undefined {
    return this.favoritesState().find(
      (photo) => photo.id === id
    );
  }

  private persist(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.favoritesState())
    );
  }

  private loadFavorites(): Photo[] {
    if (!isPlatformBrowser(this.platformId)) {
      return [];
    }

    const storedFavorites = localStorage.getItem(
      this.storageKey
    );

    if (!storedFavorites) {
      return [];
    }

    try {
      const parsed = JSON.parse(storedFavorites);

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}