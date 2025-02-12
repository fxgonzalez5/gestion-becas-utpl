import { Component, Input, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

import { clientRoutes } from '../../../panel/client/client.routing';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'shared-navigation',
  imports: [RouterModule, MenuComponent],
  templateUrl: './navigation.component.html',
  styles: `
    .group:hover .group-hover\:text-secondary {
      color: #FEBE10;
    }
  `,
})
export class NavigationComponent implements OnInit {
  @Input()
  public isCompleted: boolean | null = false;

  @Input()
  public exit: () => void = () => {};

  public menu = clientRoutes.map((route) => route ?? []).flat()
    .filter((route) => route && route.path && !route.path.includes('/'));

  public isMenuActive = signal<boolean>(false);

  ngOnInit(): void {
    // Recuperar estado del menú
    const savedState = sessionStorage.getItem('isMenuActive');
    if (savedState !== null) {
      this.isMenuActive.set(savedState === 'true');
    }
  }

  preventDefault(event: MouseEvent): void {
    event.preventDefault();
  }

  onMenuOptionSelected(): void {
    this.isMenuActive.set(true);
    sessionStorage.setItem('isMenuActive', 'true');
  }

  onMenuClose(): void {
    this.isMenuActive.set(false);
    sessionStorage.setItem('isMenuActive', 'false');
  }
}
