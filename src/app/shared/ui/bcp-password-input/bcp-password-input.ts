import { Component, input, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'bcp-password-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './bcp-password-input.html',
  styleUrls: ['./bcp-password-input.css'],
})
export class BcpPasswordInput {
  label = input<string>('');
  placeholder = input<string>('');
  disabled = input(false);
  id = input<string>('');
  name = input<string>('');
  hasError = input(false);

  value = model<string>('');

  protected visible = signal(false);

  toggle() {
    this.visible.update(v => !v);
  }
}
