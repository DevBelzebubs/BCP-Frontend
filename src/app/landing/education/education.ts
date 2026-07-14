import { Component, computed, inject } from '@angular/core';
import { UiState } from '../../service/ui-state.service';
import { PersonasEducation } from './personas-education/personas-education';
import { PymesBanner } from './pymes-banner/pymes-banner';
import { EmpresasLinks } from './empresas-links/empresas-links';

@Component({
  selector: 'app-education',
  imports: [PersonasEducation, PymesBanner, EmpresasLinks],
  templateUrl: './education.html',
  styleUrl: './education.css',
})
export class Education {
  private uiState = inject(UiState);
  currentSegment = computed(() => this.uiState.activeSegment());
}
