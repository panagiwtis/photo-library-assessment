import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { PhotoService } from './photo';

describe('PhotoService', () => {
  let service: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a batch of 12 photos', async () => {
    const photos = await firstValueFrom(service.getPhotos());

    expect(photos).toHaveLength(12);
  });

  it('should generate photos with unique ids', async () => {
    const photos = await firstValueFrom(service.getPhotos());

    const ids = photos.map((photo) => photo.id);
    const uniqueIds = new Set(ids);

    expect(uniqueIds.size).toBe(photos.length);
  });

  it('should generate valid photo data', async () => {
    const photos = await firstValueFrom(service.getPhotos());

    for (const photo of photos) {
      expect(photo.id).toBeTruthy();
      expect(photo.url).toContain('https://picsum.photos/seed/');
      expect(photo.width).toBe(400);
      expect(photo.height).toBe(300);
    }
  });

  it('should return a deterministic photo for a given id', () => {
    const photo = service.getPhotoById('photo-123');

    expect(photo).toEqual({
      id: 'photo-123',
      url: 'https://picsum.photos/seed/photo-123/900/700',
      width: 900,
      height: 700
    });
  });
});