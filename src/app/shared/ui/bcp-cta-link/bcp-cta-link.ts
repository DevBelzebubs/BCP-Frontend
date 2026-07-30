import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bcp-cta-link',
  imports: [CommonModule],
  templateUrl: './bcp-cta-link.html',
  styleUrls: ['./bcp-cta-link.css'],
})
export class BcpCtaLink {
  href = input<string>('#');
  text = input<string>('');
}
