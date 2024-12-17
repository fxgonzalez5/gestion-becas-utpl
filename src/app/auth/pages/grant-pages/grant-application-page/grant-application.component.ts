import { Component } from '@angular/core';
import NavPageComponent from "../../nav-page/nav-page.component";
import FooterPageComponent from "../../footer-page/footer-page.component";
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  templateUrl: './grant-application.component.html',
  styleUrls: ['./grant-application.component.css'],
  imports: [NavPageComponent, FooterPageComponent, RouterLink, RouterLinkActive]
})

export default class GrantApplicationPageComponent {
}