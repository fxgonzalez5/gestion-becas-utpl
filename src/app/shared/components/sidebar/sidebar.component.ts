import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

import { adminRoutes } from '../../../panel/admin/admin.routing';

@Component({
  selector: 'shared-sidebar',
  imports: [RouterModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styles: `
    .hover-bg-secondary-50:hover {
      background-color: #FEBE10DD;
    }
    .active {
      background-color: #FEBE10;
      color: #FFFFFF;
      font-weight: 500;
    }
  `
})
export class SidebarComponent {
  public sideMenu = adminRoutes.map((route) => route ?? []).flat()
    .filter((route) => route && route.path && !route.path.includes('/'));
}
