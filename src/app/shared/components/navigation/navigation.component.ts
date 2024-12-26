import { Component, Input, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { panelRoutes } from '../../../panel/panel.routing';
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
export class NavigationComponent {
  @Input()
  public onLogout: () => void = () => {};

  public menu = panelRoutes.map((route) => route.children ?? []).flat()
    .filter((route) => route && route.path);

  public isMenuActive = signal<boolean>(false);

  preventDefault(event: MouseEvent): void {
    event.preventDefault();
  }

  onMenuOptionSelected(): void {
    this.isMenuActive.set(true);
  }

  onMenuClose(): void {
    this.isMenuActive.set(false);
  }
}
