import { Injectable, signal } from '@angular/core';

export type Segment = 'personas' | 'pymes' | 'empresas';

@Injectable({
  providedIn: 'root',
})
export class UiState {
  readonly segments: Segment[] = ['personas', 'pymes', 'empresas'];
  activeSegment = signal<Segment>('personas');

  setSegment(segment: Segment) {
    this.activeSegment.set(segment);
  }
}
