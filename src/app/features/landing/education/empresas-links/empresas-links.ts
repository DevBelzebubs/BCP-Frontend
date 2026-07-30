import { Component, signal } from '@angular/core';

interface UsefulLink {
  iconName: string;
  title: string;
  link: string;
}

@Component({
  selector: 'app-empresas-links',
  imports: [],
  templateUrl: './empresas-links.html',
  styleUrl: './empresas-links.css',
})
export class EmpresasLinks {
  links = signal<UsefulLink[]>([
    {
      iconName: 'laptop',
      title: 'Telecrédito web',
      link: '#'
    },
    {
      iconName: 'thumbs-up',
      title: 'Soluciones para tus cobranzas',
      link: '#'
    },
    {
      iconName: 'paper-plane',
      title: 'Comercio Exterior',
      link: '#'
    },
    {
      iconName: 'check-circle',
      title: 'Soluciones digitales',
      link: '#'
    }
  ]);
}
