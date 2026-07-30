import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BcpSpinner } from '../bcp-spinner/bcp-spinner';

@Component({
  selector: 'bcp-button',
  imports: [CommonModule, BcpSpinner],
  templateUrl: './bcp-button.html',
  styleUrls: ['./bcp-button.css'],
})
export class BcpButton {
  variant = input<'primary' | 'outline-blue' | 'outline-gray' | 'ghost'>('primary');
  size = input<'lg' | 'md' | 'sm' | 'full'>('md');
  loading = input(false);
  disabled = input(false);
  type = input<'button' | 'submit'>('button');
  iconLeft = input<string>('');
  iconRight = input<string>('');

  clicked = output<void>();

  protected isDisabled = computed(() => this.disabled() || this.loading());

  protected variantClass = computed(() => {
    switch (this.variant()) {
      case 'primary':
        return 'bg-[#ff7800] hover:bg-[#e66c00] text-white disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed shadow-sm';
      case 'outline-blue':
        return 'border-2 border-[#002a8d] text-[#002a8d] hover:bg-[#002a8d] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed';
      case 'outline-gray':
        return 'border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed';
      case 'ghost':
        return 'text-[#5c697a] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed';
    }
  });

  protected sizeClass = computed(() => {
    switch (this.size()) {
      case 'lg':
        return 'px-8 py-4 rounded-full text-lg';
      case 'md':
        return 'px-6 py-3 rounded-xl text-sm';
      case 'sm':
        return 'px-5 py-2.5 rounded-full text-[15px]';
      case 'full':
        return 'w-full py-3 rounded-xl text-sm';
    }
  });
}
