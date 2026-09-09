import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoGrid } from './photo-grid';
import { Photo } from '../../models/photo.model';

describe('PhotoGrid', () => {
  let component: PhotoGrid;
  let fixture: ComponentFixture<PhotoGrid>;

  const photos: Photo[] = [
    {
      id: 'photo-1',
      url: 'https://picsum.photos/seed/photo-1/400/300',
      width: 400,
      height: 300
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoGrid]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoGrid);

    fixture.componentRef.setInput('photos', photos);

    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});