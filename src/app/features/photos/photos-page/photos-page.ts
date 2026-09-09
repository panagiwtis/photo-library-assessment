import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  viewChild
} from '@angular/core';

import { PhotoService } from '../../../core/services/photo';
import { FavoritesService } from '../../../core/services/favorites';
import { Photo } from '../../../shared/models/photo.model';
import { PhotoGrid } from '../../../shared/components/photo-grid/photo-grid';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-photos-page',
  imports: [
    PhotoGrid,
    LoadingSpinner
  ],
  templateUrl: './photos-page.html',
  styleUrl: './photos-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotosPage implements OnInit, AfterViewInit, OnDestroy {
  private readonly photoService = inject(PhotoService);
  private readonly favoritesService = inject(FavoritesService);
  
  readonly photos = signal<Photo[]>([]);
  readonly loading = signal(false);

  readonly loadMoreTrigger =
    viewChild.required<ElementRef<HTMLElement>>('loadMoreTrigger');

  private observer?: IntersectionObserver;

  ngOnInit(): void {
    this.loadPhotos();
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.loadPhotos();
        }
      },
      {
        root: null,
        rootMargin: '300px 0px',
        threshold: 0
      }
    );

    this.observer.observe(
      this.loadMoreTrigger().nativeElement
    );
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  loadPhotos(): void {
    if (this.loading()) {
      return;
    }

    this.loading.set(true);

    this.photoService.getPhotos().subscribe({
      next: (newPhotos) => {
        this.photos.update((currentPhotos) => {
          const existingIds = new Set(
            currentPhotos.map((photo) => photo.id)
          );

          const uniquePhotos = newPhotos.filter(
            (photo) => !existingIds.has(photo.id)
          );

          return [...currentPhotos, ...uniquePhotos];
        });

        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  onPhotoSelected(photo: Photo): void {
    this.favoritesService.add(photo);
  }
}