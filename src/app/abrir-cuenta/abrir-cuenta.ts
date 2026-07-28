import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-abrir-cuenta',
  imports: [CommonModule, RouterModule],
  templateUrl: './abrir-cuenta.html',
})
export class AbrirCuenta {
  currentSlideIndex = signal(0);

  carouselSlides = [
    {
      title: 'Abre tu cuenta de ahorros sin costo',
      subtitle: 'Cuenta de Ahorros',
      description: 'Sin mantenimiento, sin saldo mínimo. Comienza a ahorrar hoy.',
      imageBg: 'assets/img/edu-blog.jpg',
      themeColor: 'bg-[#ff7800] hover:bg-[#e66c00]',
    },
    {
      title: 'Obtén tu cuenta corriente al instante',
      subtitle: 'Cuenta Corriente',
      description: 'La mejor opción para manejar tus finanzas diarias.',
      imageBg: 'assets/img/promo-cuenta-corriente.jpg',
      themeColor: 'bg-[#ff7800] hover:bg-[#e66c00]',
    },
  ];

  accountTypes = [
    {
      tipo: 'AHORROS',
      title: 'Cuenta de Ahorros',
      description: 'Sin costo de mantenimiento. Tu dinero crece con intereses.',
      iconName: 'piggy',
    },
    {
      tipo: 'CORRIENTE',
      title: 'Cuenta Corriente',
      description: 'Maneja tus finanzas con chequera y tarjeta de débito.',
      iconName: 'card',
    },
    {
      tipo: 'CUENTA_SUELDO',
      title: 'Cuenta Sueldo',
      description: 'Recibe tu sueldo sin comisiones y con beneficios exclusivos.',
      iconName: 'money',
    },
    {
      tipo: 'PLAZO_FIJO',
      title: 'Depósito a Plazo Fijo',
      description: 'Invierte tu dinero con tasas preferenciales.',
      iconName: 'chart',
    },
  ];

  nextSlide() {
    const total = this.carouselSlides.length;
    this.currentSlideIndex.update((i) => (i + 1) % total);
  }

  prevSlide() {
    const total = this.carouselSlides.length;
    this.currentSlideIndex.update((i) => (i - 1 + total) % total);
  }

  goToSlide(index: number) {
    this.currentSlideIndex.set(index);
  }
}
