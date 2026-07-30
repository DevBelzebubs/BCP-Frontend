import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
})
export class DashboardSidebar {
  open = input(false);
  close = output<void>();
  navItems = input<NavItem[]>([]);
  logoRoute = input('/');

  protected get items(): NavItem[] {
    return this.navItems();
  }
}
