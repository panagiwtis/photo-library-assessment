import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoCard } from './photo-card';
import { Photo } from '../../models/photo.model';

describe('PhotoCard', () => {
  let component: PhotoCard;
  let fixture: ComponentFixture<PhotoCard>;

  const photo: Photo = {
    id: 'photo-1',
    url: 'https://picsum.photos/seed/photo-1/400/300',
    width: 400,
    height: 300
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoCard]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoCard);

    fixture.componentRef.setInput('photo', photo);

    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});