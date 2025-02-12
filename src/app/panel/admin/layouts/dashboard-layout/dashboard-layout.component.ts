import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';
import { CustomHeaderComponent } from '@shared/components/custom-header/custom-header.component';

@Component({
  imports: [SidebarComponent, CustomHeaderComponent, RouterModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export default class DashboardLayoutComponent {}
