import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { PhotosPage } from './photos-page';
import { PhotoService } from '../../../core/services/photo';

describe('PhotosPage', () => {
  let component: PhotosPage;
  let fixture: ComponentFixture<PhotosPage>;

  const observe = vi.fn();
  const disconnect = vi.fn();

  beforeEach(async () => {
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe = observe;
        disconnect = disconnect;

        unobserve(): void {}
      }
    );

    await TestBed.configureTestingModule({
      imports: [PhotosPage],
      providers: [
        {
          provide: PhotoService,
          useValue: {
            getPhotos: vi.fn().mockReturnValue(of([]))
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotosPage);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should observe the infinite scroll trigger', () => {
    expect(observe).toHaveBeenCalled();
  });
});