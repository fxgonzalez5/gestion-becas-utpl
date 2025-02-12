import { Component, inject } from '@angular/core';

import { AuthService } from '../../../auth/services/auth.service';

@Component({
    selector: 'shared-dropdown-menu',
    templateUrl: './dropdown-menu.component.html',
    styles: ``
})
export class DropdownMenuComponent {
  private authServices = inject(AuthService);

  public exit(): void {
    this.authServices.logout();
  }
}
