import { Component, signal } from '@angular/core';

interface BannerData {
  title: string;
  subtitle: string;
  buttonText: string;
  imageAlt: string;
  imageUrl: string;
  link: string;
}

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
