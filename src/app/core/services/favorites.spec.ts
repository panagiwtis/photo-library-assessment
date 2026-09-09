import { TestBed } from '@angular/core/testing';

import { FavoritesService } from './favorites';
import { Photo } from '../../shared/models/photo.model';

describe('FavoritesService', () => {
  let service: FavoritesService;

  const photo: Photo = {
    id: 'photo-1',
    url: 'https://picsum.photos/seed/photo-1/400/300',
    width: 400,
    height: 300
  };

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({});

    service = TestBed.inject(FavoritesService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a photo to favorites', () => {
    service.add(photo);

    expect(service.favorites()).toEqual([photo]);
    expect(service.isFavorite(photo.id)).toBe(true);
  });

  it('should not add the same photo twice', () => {
    service.add(photo);
    service.add(photo);

    expect(service.favorites().length).toBe(1);
  });

  it('should remove a photo from favorites', () => {
    service.add(photo);

    service.remove(photo.id);

    expect(service.favorites()).toEqual([]);
    expect(service.isFavorite(photo.id)).toBe(false);
  });

  it('should return a favorite photo by id', () => {
    service.add(photo);

    expect(service.getById(photo.id)).toEqual(photo);
  });

  it('should persist favorites to localStorage', () => {
    service.add(photo);

    const stored = localStorage.getItem(
      'photo-library-favorites'
    );

    expect(stored).not.toBeNull();
    expect(JSON.parse(stored!)).toEqual([photo]);
  });
  it('should load persisted favorites from localStorage', () => {
  localStorage.setItem(
    'photo-library-favorites',
    JSON.stringify([photo])
  );

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({});

  const newService = TestBed.inject(FavoritesService);

  expect(newService.favorites()).toEqual([photo]);
  });
  it('should handle invalid localStorage data gracefully', () => {
  localStorage.setItem(
    'photo-library-favorites',
    'invalid-json'
  );

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({});

  const newService = TestBed.inject(FavoritesService);

  expect(newService.favorites()).toEqual([]);
  });
});