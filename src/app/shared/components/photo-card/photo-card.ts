import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';

import { Photo } from '../../models/photo.model';

@Component({
  selector: 'app-photo-card',
  imports: [],
  templateUrl: './photo-card.html',
  styleUrl: './photo-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoCard {
  readonly photo = input.required<Photo>();
  readonly photoSelected = output<Photo>();
}