import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BcpCard, BcpButton } from '../../../shared/ui';

@Component({
  selector: 'app-loans',
  imports: [CommonModule, RouterModule, BcpCard, BcpButton],
  templateUrl: './loans.html',
})
export class Loans {}
