import { Component } from '@angular/core';

import { NotificationsBoxComponent } from '../notifications-box/notifications-box.component';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';

@Component({
  selector: 'shared-custom-header',
  imports: [NotificationsBoxComponent, DropdownMenuComponent],
  templateUrl: './custom-header.component.html',
  styles: ``
})
export class CustomHeaderComponent {
  notificationOpen = false;
  profileOpen = false;

  toggleNotifications() {
    this.notificationOpen = !this.notificationOpen;

    // Cerrar otros dropdowns
    this.profileOpen = false;
  }

  toggleProfile() {
    this.profileOpen = !this.profileOpen;

    // Cerrar otros dropdowns
    this.notificationOpen = false;
  }
}
