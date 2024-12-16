import { Component } from '@angular/core';
import NavPageComponent from "../../nav-page/nav-page.component";
import FooterPageComponent from "../../footer-page/footer-page.component";
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  templateUrl: './grant-requirements.component.html',
  styleUrls: ['./grant-requirements.component.css'],
  imports: [NavPageComponent, FooterPageComponent, RouterLink, RouterLinkActive]
})

export default class GrantRequirementsPageComponent {

      cards = [{
                    id: 'form',
                    rutaImg: '../../../../assets/images/form.svg',
                    texto: 'Llenar el formulario de solicitud de la beca.',
                    textoBoton: 'Abrir',
                    ruta: '/auth/grantrequirements',
                },
                {
                    id: 'economico',
                    rutaImg: '../../../../assets/images/economico.svg',
                    texto: 'Llenar la ficha socioeconómica.',
                    textoBoton: 'Abrir',
                    ruta: '/auth/grantrequirements',
                },{
                    id: 'registroCilvi',
                    rutaImg: '../../../../assets/images/registroCilvi.svg',
                    texto: 'Cédula(s) de identidad del estudiante y miembros del núcleo familiar. ',
                    textoBoton: 'Validar ',
                    ruta: '/auth/grantrequirements',
                },
                {
                    id: 'sri',
                    rutaImg: '../../../../assets/images/sri.svg',
                    texto: 'Certificado del SRI de registro o no del RUC del núcleo familiar.',
                    textoBoton: 'Cargar ',
                    ruta: '/auth/grantrequirements',
                },
                {
                    id: 'iess',
                    rutaImg: '../../../../assets/images/iess.svg',
                    texto: 'Certificado de afiliación o no al IESS del estudiante y de su núcleo familiar.',
                    textoBoton: 'Validar',
                    ruta: '/auth/grantrequirements',
                },
                {
                    id: 'consejoJudicatura',
                    rutaImg: '../../../../assets/images/consejoJudicatura.svg',
                    texto: 'Tarjeta de pensión alimenticia.',
                    textoBoton: 'Validar',
                    ruta: '/auth/grantrequirements',
                },
                {
                    id: 'ubicacionVivienda',
                    rutaImg: '../../../../assets/images/ubicacionVivienda.svg',
                    texto: 'Proporcionar la ubicación de la vivienda donde reside. (aplica a estudiantes de la modalidad presencial)',
                    textoBoton: 'Abrir',
                    ruta: '/auth/grantrequirements',
                },
      ]
}

