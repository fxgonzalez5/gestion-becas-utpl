import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'nav-page',
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './nav-page.component.html',
  styleUrls: ['./nav-page.component.css'],
  
})

export default class NavPageComponent implements OnInit {
  isSubRouteActive: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateActiveState(this.router.url);
    this.router.events.subscribe(() => {
      this.updateActiveState(this.router.url);
    });
  }

  updateActiveState(currentRoute: string): void {
    // Verifica si la ruta actual coincide con las subrutas de "Becas y Ayudas Estudiantiles"
    const subRoutes = ['/auth/application', '/auth/followup', '/auth/grantrequirements'];
    this.isSubRouteActive = subRoutes.includes(currentRoute);
  }

}