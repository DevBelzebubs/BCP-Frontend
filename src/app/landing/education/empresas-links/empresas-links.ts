import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-empresas-links',
  imports: [],
  templateUrl: './empresas-links.html',
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
