import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bcp-alert',
  imports: [CommonModule],
  templateUrl: './bcp-alert.html',
  styleUrls: ['./bcp-alert.css'],
})
export class BcpAlert {
  type = input<'error' | 'success' | 'warning' | 'info'>('info');
  dismissible = input(false);

  protected iconPath = computed(() => {
    switch (this.type()) {
      case 'error':
        return 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
      case 'success':
        return 'M5 13l4 4L19 7';
      case 'warning':
        return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z';
      case 'info':
        return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  });

  protected containerClass = computed(() => {
    switch (this.type()) {
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      case 'info':
        return 'bg-blue-50 border-blue-100';
    }
  });

  protected iconClass = computed(() => {
    switch (this.type()) {
      case 'error': return 'text-red-500';
      case 'success': return 'text-green-600';
      case 'warning': return 'text-orange-500';
      case 'info': return 'text-blue-600';
    }
  });
}
