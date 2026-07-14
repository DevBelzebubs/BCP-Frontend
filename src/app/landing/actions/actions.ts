import { Component, computed, inject } from '@angular/core';
import { Segment, UiState } from '../../service/ui-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actions',
  imports: [CommonModule],
  templateUrl: './actions.html',
  styleUrl: './actions.css',
})
export class Actions {
  private uiState = inject(UiState);
  currentActions = computed(() => this.actionsData[this.uiState.activeSegment()]);
  currentForm = computed(() => this.formData[this.uiState.activeSegment()]);

  formData: Record<Segment, FormConfig> = {
    personas: { docTypes: ['DNI', 'RUC'], placeholder: 'Nro Documento' },
    pymes: { docTypes: ['RUC'], placeholder: 'RUC' },
    empresas: { docTypes: ['RUC'], placeholder: 'RUC' }
  };

  actionsData: Record<Segment, QuickAction[]> = {
    personas: [
      { label: 'Abre una cuenta', iconName: 'piggy', badge: 'Sorteo' },
      { label: 'Obtener una Tarjeta', iconName: 'card', badge: 'Cashback' },
      { label: 'Solicitar un Préstamo', iconName: 'money-bag' },
      { label: 'Adelantar mi Sueldo', iconName: 'money-bill' },
      { label: 'SOAT Virtual desde S/47', iconName: 'car', badge: 'Promo' },
      { label: 'Proteger mis Tarjetas', iconName: 'shield' },
      { label: 'Ver mis beneficios', iconName: 'percent' },
      { label: 'Ir a Ayuda Rápida', iconName: 'question' }
    ],
    pymes: [
      { label: 'Capital de Trabajo', iconName: 'money-bag', badge: 'Online' },
      { label: 'Abrir Cuenta Corriente', iconName: 'piggy', badge: 'Online' },
      { label: 'Préstamo Activo Fijo', iconName: 'factory' },
      { label: 'POS Culqi', iconName: 'pos' },
      { label: 'Explorar Mi Negocio BCP', iconName: 'monitor' },
      { label: 'Adelantar mis facturas', iconName: 'files' },
      { label: 'Evalúate para un préstamo', iconName: 'file-check' },
      { label: 'Ir a Ayuda Rápida', iconName: 'question' }
    ],
    empresas: [
      { label: 'Pagos de mi empresa', iconName: 'file-invoice' },
      { label: 'Cobranzas de mi empresa', iconName: 'money-bill' },
      { label: 'Cuenta Corriente', iconName: 'piggy' },
      { label: 'Financiamiento Electrónico', iconName: 'money-bag' },
      { label: 'Descuento de Facturas', iconName: 'percent-box' },
      { label: 'Factoring Electrónico', iconName: 'monitor' },
      { label: 'Carta Fianza', iconName: 'file-doc' },
      { label: 'Ir a Ayuda Rápida', iconName: 'question' }
    ]
  };
}
