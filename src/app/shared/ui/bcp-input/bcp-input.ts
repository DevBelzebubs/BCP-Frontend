import { Component, computed, input, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'bcp-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './bcp-input.html',
  styleUrls: ['./bcp-input.css'],
})
export class BcpInput {
  label = input<string>('');
  placeholder = input<string>('');
  type = input<string>('text');
  disabled = input(false);
  hasError = input(false);
  hasSuccess = input(false);
  variant = input<'standard' | 'mono-center'>('standard');
  maxlength = input<number | null>(null);
  name = input<string>('');
  id = input<string>('');

  value = model<string | number>('');
  onBlur = output<FocusEvent>();

  protected inputClasses = computed(() => {
    const base = 'w-full px-4 py-3.5 rounded-xl border-2 outline-none transition-all text-sm';
    const standard = 'focus:border-[#0051ff]';
    const monoCenter = this.variant() === 'mono-center'
      ? 'tracking-widest font-mono text-center text-lg'
      : '';
    const border = this.hasSuccess()
      ? 'border-green-400 bg-green-50/30'
      : this.hasError()
        ? 'border-orange-300 bg-orange-50/30'
        : 'border-gray-200 focus:border-[#0051ff]';
    const disabled = this.disabled() ? 'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed' : '';
    return `${base} ${standard} ${monoCenter} ${border} ${disabled}`.trim();
  });
}
