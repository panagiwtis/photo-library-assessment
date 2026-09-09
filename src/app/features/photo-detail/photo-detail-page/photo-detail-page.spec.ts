import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PhotoDetailPage } from './photo-detail-page';
import { FavoritesService } from '../../../core/services/favorites';

describe('PhotoDetailPage', () => {
  let component: PhotoDetailPage;
  let fixture: ComponentFixture<PhotoDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoDetailPage],
      providers: [
        provideRouter([
          {
            path: 'photos/:id',
            component: PhotoDetailPage
          }
        ]),
        FavoritesService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoDetailPage);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});