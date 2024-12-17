import { Component } from '@angular/core';
import NavPageComponent from "../../nav-page/nav-page.component";
import FooterPageComponent from "../../footer-page/footer-page.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import PopupCivilRegistryPageComponent from '../popup-civil-registry-page/popup-civil-registry.component';
import PopupIESSPageComponent from '../popup-iess-page/popup-iess.component';
import PopupjudicialCouncilPageComponent from '../popup-judicial-council-page/popup-judicial-council.component';
import PopupSRIPageComponent from '../popup-sri-page/popup-sri.component';

@Component({
  templateUrl: './grant-requirements.component.html',
  styleUrls: ['./grant-requirements.component.css'],
  imports: [NavPageComponent, FooterPageComponent, RouterLink, RouterLinkActive]
})

export default class GrantRequirementsPageComponent {

    constructor(private dialogRef: MatDialog){}

    openDialog(ruta: string){
        let componente
        switch(ruta){
            case 'PopupCivilRegistryPageComponent':
                componente = PopupCivilRegistryPageComponent
                break
            case 'PopupSRIPageComponent':
                componente = PopupSRIPageComponent
                break
            case 'PopupIESSPageComponent':
                componente = PopupIESSPageComponent
                break
            case 'PopupjudicialCouncilPageComponent':
                componente = PopupjudicialCouncilPageComponent
                break
            default:
                componente = GrantRequirementsPageComponent
        }
        this.dialogRef.open(componente, {
            position: {
              right: '-25px',
            },
            height: '100vh',
            width: '500px',
            panelClass: 'centered-to-anchor-dialog',
          })
    }

    cards = [{
        id: 'form',
        rutaImg: '../../../../assets/images/form.svg',
        texto: 'Llenar el formulario de solicitud de la beca.',
        textoBoton: 'Abrir',
        ruta: '/auth/grantapplication',
        mismaPagina: false
    },
    {
        id: 'economico',
        rutaImg: '../../../../assets/images/economico.svg',
        texto: 'Llenar la ficha socioeconómica.',
        textoBoton: 'Abrir',
        ruta: '/auth/socioeconomicdata',
        mismaPagina: false
    },{
        id: 'registroCilvi',
        rutaImg: '../../../../assets/images/registroCilvi.png',
        texto: 'Cédula(s) de identidad del estudiante y miembros del núcleo familiar. ',
        textoBoton: 'Validar ',
        ruta: 'PopupCivilRegistryPageComponent',
        mismaPagina: true
    },
    {
        id: 'sri',
        rutaImg: '../../../../assets/images/sri.svg',
        texto: 'Certificado del SRI de registro o no del RUC del núcleo familiar.',
        textoBoton: 'Cargar ',
        ruta: 'PopupSRIPageComponent',
        mismaPagina: true
    },
    {
        id: 'iess',
        rutaImg: '../../../../assets/images/iess.svg',
        texto: 'Certificado de afiliación o no al IESS del estudiante y de su núcleo familiar.',
        textoBoton: 'Validar',
        ruta: 'PopupIESSPageComponent',
        mismaPagina: true
    },
    {
        id: 'consejoJudicatura',
        rutaImg: '../../../../assets/images/consejoJudicatura.svg',
        texto: 'Tarjeta de pensión alimenticia.',
        textoBoton: 'Validar',
        ruta: 'PopupjudicialCouncilPageComponent',
        mismaPagina: true
    },
    {
        id: 'ubicacionVivienda',
        rutaImg: '../../../../assets/images/ubicacionVivienda.svg',
        texto: 'Proporcionar la ubicación de la vivienda donde reside. (aplica a estudiantes de la modalidad presencial)',
        textoBoton: 'Abrir',
        ruta: '/auth/location',
        mismaPagina: false
    },
    ]
}

