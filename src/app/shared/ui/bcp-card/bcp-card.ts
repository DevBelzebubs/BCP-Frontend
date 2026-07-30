import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bcp-card',
  imports: [CommonModule],
  templateUrl: './bcp-card.html',
  styleUrls: ['./bcp-card.css'],
})
export class BcpCard {
  padding = input<'sm' | 'md' | 'lg'>('md');
  hover = input<'none' | 'lift' | 'shadow'>('lift');
  rounded = input<'xl' | '2xl' | '3xl'>('2xl');
  shadow = input<'sm' | 'md' | 'lg'>('sm');
  accentBar = input(false);

  protected paddingClass = computed(() => {
    switch (this.padding()) {
      case 'sm': return 'p-4 sm:p-5';
      case 'md': return 'p-6 sm:p-8';
      case 'lg': return 'p-8 sm:p-10';
    }
  });

  protected hoverClass = computed(() => {
    switch (this.hover()) {
      case 'none': return '';
      case 'lift': return 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300';
      case 'shadow': return 'hover:shadow-lg transition-all duration-300';
    }
  });

  protected roundedClass = computed(() => {
    switch (this.rounded()) {
      case 'xl': return 'rounded-xl';
      case '2xl': return 'rounded-2xl';
      case '3xl': return 'rounded-[24px]';
    }
  });

  protected shadowClass = computed(() => {
    switch (this.shadow()) {
      case 'sm': return 'shadow-sm';
      case 'md': return 'shadow-md';
      case 'lg': return 'shadow-lg';
    }
  });
}
