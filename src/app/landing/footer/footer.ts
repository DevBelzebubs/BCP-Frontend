import { Component, signal } from '@angular/core';

interface FooterLink {
  label: string;
  url: string;
  badge?: string;
}

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear = signal(new Date().getFullYear());

  sobreBcp = signal<FooterLink[]>([
    { label: 'Nuestra historia y principios', url: '#' },
    { label: 'Información para inversionistas BCP', url: '#' },
    { label: 'Responsabilidad Social BCP', url: '#' },
    { label: 'Centro de Innovación', url: '#' },
    { label: 'Trabaja con nosotros', url: '#', badge: '¡Postula hoy!' },
  ]);

  ayuda = signal<FooterLink[]>([
    { label: 'Cancela tu producto', url: '#' },
    { label: 'Cancela tu tarjeta de crédito', url: '#' },
    { label: 'Cancela tu seguro', url: '#' },
    { label: 'Solicitud de Ajustes Razonables', url: '#' },
  ]);

  legales = signal<FooterLink[]>([
    { label: 'Tasas y tarifas', url: '#' },
    { label: 'Transparencia de información', url: '#' },
    { label: 'Declaración del Beneficiario final', url: '#' },
    { label: '¿Cómo protegemos tus datos?', url: '#' },
    { label: 'Accesibilidad', url: '#' },
  ]);

  novedades = signal<FooterLink[]>([
    { label: 'Ganadores de sorteos y promociones 2025', url: '#' },
  ]);

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
