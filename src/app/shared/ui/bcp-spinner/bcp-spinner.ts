import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bcp-spinner',
  imports: [CommonModule],
  templateUrl: './bcp-spinner.html',
  styleUrls: ['./bcp-spinner.css'],
})
export class BcpSpinner {
  size = input<'sm' | 'md' | 'lg'>('md');
  color = input<'blue' | 'white' | 'orange'>('blue');

  protected sizeClass = computed(() => {
    switch (this.size()) {
      case 'sm': return 'h-4 w-4';
      case 'md': return 'h-5 w-5';
      case 'lg': return 'h-8 w-8';
    }
  });

  protected colorClass = computed(() => {
    switch (this.color()) {
      case 'blue': return 'text-[#0051ff]';
      case 'white': return 'text-white';
      case 'orange': return 'text-[#ff7800]';
    }
  });
}
