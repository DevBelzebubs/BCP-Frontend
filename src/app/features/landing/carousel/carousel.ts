import { Component, computed, effect, HostListener, inject, signal } from '@angular/core';
import { Segment, UiState } from '../../../core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

interface CarouselSlide {
  title: string;
  subtitle: string;
  buttonText: string;
  imageBg?: string;
  themeColor: string;
  rightImage?: string;
  bgColor?: string;
}

@Component({
  selector: 'app-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel {
  private uiState = inject(UiState);

  currentSlideIndex = signal(0);

  currentSegmentSlides = computed(() => this.slideData[this.uiState.activeSegment()]);

  activeSlide = computed(() => {
    const slides = this.currentSegmentSlides();
    return slides[this.currentSlideIndex()] || slides[0];
  });

  hasMultipleSlides = computed(() => this.currentSegmentSlides().length > 1);
  private autoPlaySub?: Subscription;
  private dragStartX = 0;
  isDragging = false;
  constructor() {
    effect(
      () => {
        this.uiState.activeSegment();
        this.currentSlideIndex.set(0);
      },
      { allowSignalWrites: true },
    );
  }
  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }
  nextSlide() {
    const total = this.currentSegmentSlides().length;
    this.currentSlideIndex.update((i) => (i + 1) % total);
  }
  prevSlide() {
    const total = this.currentSegmentSlides().length;
    this.currentSlideIndex.update((i) => (i - 1 + total) % total);
  }

  goToSlide(index: number) {
    this.currentSlideIndex.set(index);
    this.resetAutoPlay();
  }
  ondragStart(event: MouseEvent | TouchEvent) {
    if (!this.hasMultipleSlides()) return;
    this.isDragging = true;
    this.stopAutoPlay();
    this.dragStartX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
  }
  @HostListener('mouseup', ['$event'])
  @HostListener('touchend', ['$event'])
  ondragEnd(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    const drangEndX = event instanceof MouseEvent ? event.clientX : event.changedTouches[0].clientX;
    const difference = drangEndX - this.dragStartX;
    const threshold = 50;
    if (difference > threshold) {
      this.prevSlide();
    } else if (difference < -threshold) {
      this.prevSlide();
    }
    this.isDragging = false;
    this.resetAutoPlay();
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.isDragging) {
      this.isDragging = false;
      this.startAutoPlay();
    }
  }
  slideData: Record<Segment, CarouselSlide[]> = {
    personas: [
      {
        title: '¡BCP te lleva a París en San Valentín!',
        subtitle: 'Sorteo Exclusivo',
        buttonText: 'Participa aquí',
        imageBg: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop',
        themeColor: 'bg-[#ff7800] hover:bg-[#e66c00]',
      },
      {
        title: 'Nueva Cuenta de Ahorros Digital',
        subtitle: 'Sin mantenimiento',
        buttonText: 'Abre tu cuenta',
        themeColor: 'bg-[#ff7800] hover:bg-[#e66c00]',
        rightImage: 'assets/img/Banner-Hero_Mobile.png',
        bgColor: '#002a8d',
      },
      {
        title: 'Adelanta tu sueldo al instante',
        subtitle: 'Beneficio Cuenta Sueldo',
        buttonText: 'Pídelo ya',
        themeColor: 'bg-[#ff7800] hover:bg-[#e66c00]',
        rightImage: 'assets/img/vitrina-home-BCP_campaña-masiva_desk.png',
        bgColor: '#1e293b',
      },
    ],
    pymes: [
      {
        title: '¡Haz crecer tu negocio con nuestros préstamos!',
        subtitle: 'Campaña PyME 2026',
        buttonText: 'Solicítalo ahora',
        imageBg:
          'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop',
        themeColor: 'bg-[#002a8d] hover:bg-[#001f6b]',
      },
      {
        title: 'Vende más con Yape para Negocios',
        subtitle: 'Soluciones de Cobro',
        buttonText: 'Afíliate aquí',
        imageBg:
          'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop',
        themeColor: 'bg-[#002a8d] hover:bg-[#001f6b]',
      },
    ],

    empresas: [
      {
        title: 'Solicita tu Carta Fianza desde la web',
        subtitle: 'Nuevo Telecrédito',
        buttonText: 'Ingresar a Telecrédito',
        imageBg:
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
        themeColor: 'bg-[#002a8d] hover:bg-[#001f6b]',
      },
    ],
  };
  private startAutoPlay() {
    if (this.hasMultipleSlides() && !this.autoPlaySub) {
      this.autoPlaySub = interval(6000).subscribe(() => this.nextSlide());
    }
  }

  private stopAutoPlay() {
    if (this.autoPlaySub) {
      this.autoPlaySub.unsubscribe();
      this.autoPlaySub = undefined;
    }
  }
  private resetAutoPlay() {
    this.stopAutoPlay();
    setTimeout(() => this.startAutoPlay(), 500);
  }
}
