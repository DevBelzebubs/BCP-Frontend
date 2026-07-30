import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface QuickAction {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'bcp-quick-actions',
  imports: [CommonModule, RouterModule],
  templateUrl: './quick-actions.html',
  styleUrl: './quick-actions.css',
})
export class BcpQuickActions {
  protected actions: QuickAction[] = [
    {
      label: 'Transferir',
      icon: 'transfer',
      route: '/dashboard/transfer',
    },
    {
      label: 'Pagar Servicios',
      icon: 'pay',
      route: '/dashboard/payments',
    },
    {
      label: 'Solicitar Préstamo',
      icon: 'loan',
      route: '/dashboard/loans',
    },
    {
      label: 'Ver Movimientos',
      icon: 'movements',
      route: '/dashboard/accounts',
    },
  ];
}
