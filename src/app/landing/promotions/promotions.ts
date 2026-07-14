import { Component, computed, inject, signal } from '@angular/core';
import { Segment, UiState } from '../../service/ui-state.service';

@Component({
  selector: 'app-promotions',
  imports: [],
  templateUrl: './promotions.html',
  styleUrl: './promotions.css',
})
export class Promotions {
  private uiState = inject(UiState);
  activeSegment = this.uiState.activeSegment;

  currentPromotions = computed(() => this.promotionsData[this.activeSegment()]);
  currentFeatured = computed(() => this.featuredData[this.activeSegment()]);

  promotionsData: Record<Segment, PromoCard[]> = {
    personas: [
      {
        title: '¡Obtén tu Seguro de Protección de Tarjetas y cuida tu dinero!',
        image: 'assets/img/promo-seguro.jpg',
        link: '#'
      },
      {
        title: '¡Gana hasta S/20 con Wardaditos!',
        image: 'assets/img/promo-wardaditos.jpg',
        link: '#'
      },
      {
        title: 'Pide un Préstamo online y obtén tu dinero al instante',
        image: 'assets/img/promo-prestamo.jpg',
        link: '#'
      },
      {
        title: '¡Tu Tarjeta de Crédito en segundos!',
        image: 'assets/img/promo-tarjeta.jpg',
        link: '#'
      }
    ],
    pymes: [
      {
        title: 'Capital de Trabajo 100% Online para tu negocio',
        image: 'assets/img/promo-capital-trabajo.jpg',
        link: '#'
      },
      {
        title: 'Mi Negocio BCP: Soluciones en un solo lugar',
        image: 'assets/img/promo-mi-negocio.jpg',
        link: '#'
      },
      {
        title: 'POS Culqi: Acepta pagos con tarjeta en tu negocio',
        image: 'assets/img/promo-pos-culqi.jpg',
        link: '#'
      },
      {
        title: 'Cuenta Corriente para tu empresa',
        image: 'assets/img/promo-cuenta-corriente.jpg',
        link: '#'
      }
    ],
    empresas: []
  };

  featuredData: Record<Segment, FeaturedContent> = {
    personas: {
      badge: 'App Banca Móvil BCP',
      title: 'Realiza operaciones desde donde estés',
      ctaText: 'Descubre más',
      image: 'assets/img/promo-banca-movil.jpg',
      link: '#'
    },
    pymes: {
      badge: 'Mi Negocio BCP',
      title: 'Haz crecer tu negocio con las mejores soluciones',
      ctaText: 'Conoce más',
      image: 'assets/img/promo-mi-negocio-featured.jpg',
      link: '#'
    },
    empresas: {
      badge: '',
      title: '',
      ctaText: '',
      image: '',
      link: ''
    }
  };

  // Carrusel empresas
  carouselSlides = signal<NewsSlide[]>([
    {
      eyebrow: 'NOVEDADES',
      title: '¡Opera desde cualquier lugar con TLC Móvil BCP!',
      description: 'Consulta tus saldos y movimientos, firma y envía tus operaciones, y registra tus Transferencias BCP, todo desde la comodidad de tu celular. Disponible en Google Play Store y App Store.',
      buttonText: 'Conoce más',
      image: 'assets/img/tlc-movil.png',
      link: '#'
    },
    {
      eyebrow: 'SEGUIMIENTO',
      title: 'Tracking de Operaciones en TLC Móvil',
      description: '¡Ya puedes ver el tracking de tus operaciones desde Telecrédito móvil! Monitorea el estado de tus transferencias y pagos en tiempo real desde tu celular.',
      buttonText: 'Afíliate aquí',
      image: 'assets/img/tracking-operaciones.png',
      link: '#'
    },
    {
      eyebrow: 'SERVICIOS',
      title: 'Paga tus servicios por la App Banca Móvil BCP',
      description: 'Realiza el pago de todos tus servicios de forma rápida y segura desde la aplicación. Ahorra tiempo y gestiona los pagos de tu empresa desde cualquier lugar.',
      buttonText: 'Conoce más',
      image: 'assets/img/pago-servicios.png',
      link: '#'
    }
  ]);

  currentIndex = signal(0);
  currentSlide = computed(() => this.carouselSlides()[this.currentIndex()]);

  next() {
    this.currentIndex.update(i => (i + 1) % this.carouselSlides().length);
  }

  prev() {
    this.currentIndex.update(i => (i - 1 + this.carouselSlides().length) % this.carouselSlides().length);
  }

  goTo(index: number) {
    this.currentIndex.set(index);
  }
}
