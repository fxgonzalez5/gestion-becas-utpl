import { Component } from '@angular/core';
import NavPageComponent from "../../nav-page/nav-page.component";
import FooterPageComponent from "../../footer-page/footer-page.component";
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  templateUrl: './followup-page.component.html',
  styleUrls: ['./followup-page.component.css'],
  imports: [NavPageComponent, FooterPageComponent, RouterLink, RouterLinkActive,]
})

export default class FollowUpPageComponent {

    datosTabla = [{
        anio: "2023",
        periodo: "OCTUBRE - FEBRERO",
        modalidad: "Precencial",
        tipoBeca: "Nivel de Ingresos",
        fechaSolicitud: "19 de Junio",
        estadoSolicitud: "Beca Asignada",
        observaciones: "Ninguna",
        ruta: '/auth/grantrequirements',
    }, 
    {
        anio: "2024",
        periodo: "ABRIL - AGOSTO",
        modalidad: "Precencial",
        tipoBeca: "Deportistas Destacados",
        fechaSolicitud: "04 de Enero",
        estadoSolicitud: "Beca Asignada",
        observaciones: "Ninguna",
        ruta: '/auth/grantrequirements',
    }]
}