import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { Photo } from '../../shared/models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private readonly batchSize = 12;

  getPhotos(): Observable<Photo[]> {
    const photos = Array.from({ length: this.batchSize }, () =>
      this.createRandomPhoto()
    );

    const randomDelay = 200 + Math.floor(Math.random() * 101);

    return of(photos).pipe(delay(randomDelay));
  }

  getPhotoById(id: string): Photo {
    return {
      id,
      url: `https://picsum.photos/seed/${id}/900/700`,
      width: 900,
      height: 700
    };
  }

  private createRandomPhoto(): Photo {
    const id = crypto.randomUUID();

    return {
      id,
      url: `https://picsum.photos/seed/${id}/400/300`,
      width: 400,
      height: 300
    };
  }
}

