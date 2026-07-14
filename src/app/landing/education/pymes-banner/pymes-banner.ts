import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-pymes-banner',
  imports: [],
  templateUrl: './pymes-banner.html',
})
export class PymesBanner {
  bannerData = signal<BannerData>({
    title: 'Crédito para tu negocio: 100% online con tu Reporte Tributario',
    subtitle: 'Rápido y fácil en Mi Negocio BCP',
    buttonText: 'Solicitar crédito',
    imageAlt: 'Empresario sonriendo',
    imageUrl: 'assets/img/empresario-bcp.png',
    link: '#'
  });
}
