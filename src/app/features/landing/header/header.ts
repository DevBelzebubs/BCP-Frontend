import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Segment, UiState } from '../../../core';
import { BcpBadge } from '../../../shared/ui';

interface SubMenuItem {
  label: string;
  iconName: string;
  badge?: string;
}

interface MenuOption {
  label: string;
  subItems?: SubMenuItem[];
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, BcpBadge],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {
  protected uiState = inject(UiState);
  activeMenu = signal<string | null>(null);
  activeSegment = this.uiState.activeSegment;
  segments = this.uiState.segments;
  mobileMenuOpen = signal(false);
  readonly menuConfig: Record<Segment, MenuOption[]> = {
    personas: [
      { 
        label: 'Productos', 
        subItems: [
          { label: 'Cuentas', iconName: 'piggy' },
          { label: 'Tarjetas', iconName: 'card' },
          { label: 'Préstamos', iconName: 'money' },
          { label: 'Seguros', iconName: 'shield' },
          { label: 'Inversiones', iconName: 'chart' },
          { label: 'Tipo de cambio', iconName: 'exchange' },
          { label: 'Servicios', iconName: 'bulb' }
        ]
      },
      { 
        label: 'Soluciones Digitales',
        subItems: [
          { label: 'Banca Móvil', iconName: 'mobile' },
          { label: 'Banca por Internet', iconName: 'desktop' },
          { label: 'Yape', iconName: 'yape' },
          { label: 'Tarjeta de Crédito iO', iconName: 'io' },
          { label: 'Pago Automático', iconName: 'refresh' },
          { label: 'Otras soluciones', iconName: 'bulb' }
        ]
      },
      { 
        label: 'Beneficios',
        subItems: [
          { label: 'Programa de Lealtad Qore', iconName: 'qore', badge: 'Nuevo' },
          { label: 'Mundo Cuenta Sueldo QORE', iconName: 'money-bag' },
          { label: 'Mundo Tarjetas de Crédito', iconName: 'card' },
          { label: 'Cuotas Sin Intereses', iconName: 'hand-bag' },
          { label: 'Mi Espacio BCP', iconName: 'rocket' }
        ]
      },
      { 
        label: 'Ayuda y Educación',
        subItems: [
          { label: 'Centro de Ayuda', iconName: 'question' },
          { label: 'Cursos Virtuales ABC', iconName: 'book' },
          { label: 'Facilidades de Pago', iconName: 'money' },
          { label: 'Alerta fraude', iconName: 'shield' },
          { label: 'Agenda una cita', iconName: 'store' },
          { label: 'Citas Virtuales', iconName: 'headset' },
          { label: 'Ubícanos', iconName: 'pin' },
          { label: 'Procesos pendientes', iconName: 'card-doc' }
        ]
      }
    ],

    pymes: [
      { 
        label: 'Productos', 
        subItems: [
          { label: 'Préstamos', iconName: 'money' },
          { label: 'Cuentas', iconName: 'piggy' },
          { label: 'Tarjetas', iconName: 'card' },
          { label: 'Pagos', iconName: 'bag' },
          { label: 'Cobros', iconName: 'pos' },
          { label: 'Tipo de Cambio', iconName: 'exchange' },
          { label: 'Seguros', iconName: 'shield' }
        ]
      },
      { 
        label: 'Soluciones Digitales',
        subItems: [
          { label: 'Mi Negocio BCP', iconName: 'factory' },
          { label: 'Wally Tienda Virtual', iconName: 'elephant' },
          { label: 'Factoring', iconName: 'chat-money' },
          { label: 'Wally Free (Grou)', iconName: 'elephant-blue' },
          { label: 'Crece', iconName: 'building' },
          { label: 'Evalúate', iconName: 'check-doc' }
        ]
      },
      { 
        label: 'Beneficios',
        subItems: [
          { label: 'Mundo Cuenta Sueldo', iconName: 'money-bag' },
          { label: 'Mundo Tarjetas de Crédito', iconName: 'card' }
        ]
      },
      { 
        label: 'Ayuda y Educación',
        subItems: [
            { label: 'Centro de Ayuda', iconName: 'question' },
            { label: 'ABC del BCP', iconName: 'book' },
            { label: 'Alerta fraude', iconName: 'shield' },
            { label: 'Facilidades de Pago', iconName: 'money' },
            { label: 'Citas Virtuales', iconName: 'headset' },
            { label: 'Agenda una cita', iconName: 'store' },
            { label: 'Ubícanos', iconName: 'pin' },
            { label: 'Procesos pendientes', iconName: 'bulb' }
        ]
      }
    ],

    empresas: [
      { 
        label: 'Productos', 
        subItems: [
          { label: 'Cuentas', iconName: 'piggy' },
          { label: 'Tarjetas', iconName: 'card' },
          { label: 'Financiamiento', iconName: 'money' },
          { label: 'Pagos', iconName: 'bag' },
          { label: 'Cobranza', iconName: 'pos' },
          { label: 'Servicios', iconName: 'exchange' },
          { label: 'Seguros', iconName: 'shield' },
          { label: 'Comercio Exterior', iconName: 'flag' }
        ]
      },
      { 
        label: 'Soluciones Digitales',
        subItems: [
          { label: 'Wally Punto de Venta', iconName: 'piggy' }, 
          { label: 'Wally Tienda Virtual', iconName: 'card' },
          { label: 'BCP Xplore', iconName: 'mobile' },
          { label: 'Evalúate', iconName: 'check-doc' }
        ]
      },
      { 
        label: 'Beneficios',
        subItems: [
          { label: 'Mundo Cuenta Sueldo', iconName: 'piggy' },
          { label: 'Mundo Tarjetas de Crédito', iconName: 'card' }
        ]
      },
      { 
        label: 'Ayuda y Educación',
        subItems: [
          { label: 'ABC del BCP', iconName: 'book' },
          { label: 'Centro de Ayuda', iconName: 'question' },
          { label: 'Alerta fraude', iconName: 'shield' },
          { label: 'Procesos Pendientes', iconName: 'card-doc' },
          { label: 'Agenda una cita', iconName: 'store' },
          { label: 'Citas Virtuales', iconName: 'headset' },
          { label: 'Ubícanos', iconName: 'pin' }
        ]
      }
    ]
  };
  currentMenuOptions = computed(() => this.menuConfig[this.activeSegment()]);
  setSegment(segment: Segment) {
    this.activeSegment.set(segment);
    this.activeMenu.set(null); 
    this.mobileMenuOpen.set(false);
  }
  toggleMenu(label: string) {
    this.activeMenu.update(current => current === label ? null : label);
  }
  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }
}
