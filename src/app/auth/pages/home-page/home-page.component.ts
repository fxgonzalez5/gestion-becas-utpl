import { Component } from '@angular/core';
import NavPageComponent from "../nav-page/nav-page.component";
import FooterPageComponent from "../footer-page/footer-page.component";

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  imports: [NavPageComponent, FooterPageComponent]
})

export default class HomePageComponent {}