import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bcp-badge',
  imports: [CommonModule],
  templateUrl: './bcp-badge.html',
  styleUrls: ['./bcp-badge.css'],
})
export class BcpBadge {
  variant = input<'navy' | 'blue' | 'white' | 'green' | 'orange'>('navy');
  pill = input(false);

  protected classes = computed(() => {
    const base = 'font-bold whitespace-nowrap';
    const pillClass = this.pill() ? 'rounded-full' : 'rounded-md';
    switch (this.variant()) {
      case 'navy':
        return `${base} ${pillClass} bg-[#002a8d] text-white text-xs px-3 py-1`;
      case 'blue':
        return `${base} ${pillClass} bg-[#0051ff] text-white text-xs px-3 py-1`;
      case 'white':
        return `${base} ${pillClass} bg-white text-gray-900 text-xs px-3 py-1.5 shadow-sm`;
      case 'green':
        return `${base} ${pillClass} bg-[#78be20] text-white text-[10px] px-1.5 py-0.5 uppercase tracking-wide`;
      case 'orange':
        return `${base} ${pillClass} bg-[#ff7800] text-white text-[10px] px-2 py-0.5`;
    }
  });
}
