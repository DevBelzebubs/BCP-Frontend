import { Component, signal } from '@angular/core';
import { BcpBadge, BcpCtaLink } from '../../../../shared/ui';

interface EducationCard {
  badge: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

@Component({
  selector: 'app-personas-education',
  imports: [BcpBadge, BcpCtaLink],
  templateUrl: './personas-education.html',
})
export class PersonasEducation {
  educationItems = signal<EducationCard[]>([
    {
      badge: 'Curso online',
      title: 'Mi historial Crediticio',
      description: 'Ponte a prueba y certifícate gratis',
      image: 'assets/img/edu-curso.jpg',
      link: '#'
    },
    {
      badge: 'Blog BCP',
      title: 'Conoce nuestro Blog BCP',
      description: 'Encuentra artículos novedosos',
      image: 'assets/img/edu-blog.jpg',
      link: '#'
    },
    {
      badge: 'Podcast',
      title: 'Aprende a manejar tu dinero',
      description: '1h 32m',
      image: 'assets/img/edu-podcast.jpg',
      link: '#'
    }
  ]);
}
