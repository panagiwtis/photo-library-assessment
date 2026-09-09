import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';

import { Photo } from '../../models/photo.model';
import { PhotoCard } from '../photo-card/photo-card';

@Component({
  selector: 'app-photo-grid',
  imports: [PhotoCard],
  templateUrl: './photo-grid.html',
  styleUrl: './photo-grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoGrid {
  readonly photos = input.required<Photo[]>();
  readonly photoSelected = output<Photo>();
}