import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BcpButton } from '../../../shared/ui';

@Component({
  selector: 'app-loans',
  imports: [CommonModule, RouterModule, BcpButton],
  templateUrl: './loans.html',
})
export class Loans {}
