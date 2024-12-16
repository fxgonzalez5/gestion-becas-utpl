import { Component } from '@angular/core';
import NavPageComponent from "../../nav-page/nav-page.component";
import FooterPageComponent from "../../footer-page/footer-page.component";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.css'],
  imports: [NavPageComponent, FooterPageComponent, RouterLink, RouterLinkActive,]
})

export default class ApplicationPageComponent {
  constructor(private sanitizer: DomSanitizer) {
    this.sanatizeItems();
  }

  anios = [
    {valor: '2020'},
    {valor: '2021'},
    {valor: '2022'},
    {valor: '2023'},
    {valor: '2024'},
  ]

  periodos = [
    {valor: 'OCTUBRE-FEBRERO'},
    {valor: 'MARZO-JULIO'},
  ]

  modalidades = [
    {valor: 'PRESENCIAL'},
    {valor: 'DISTANCIA'},
  ]

  categorias = [
    {valor: 'TODAS'},
    {valor: 'INCLUSIÓN'},
    {valor: 'APOYO ECONÓMICO'},
    {valor: 'ESTRATÉGICA'},
    {valor: 'EXCELENCIA'},
  ]

  cards: {
    id: string;
    titulo: string;
    categoria: string;
    dirigido: string;
    textoBoton: string;
    textSvg: string;
    svg: SafeHtml;
    ruta: string;
  }[] = [{
              id: 'discapacidad',
              titulo: 'Discapacidad',
              categoria: 'Inclusión',
              dirigido: 'Estudiantes con discapacidad, de acuerdo a lo establecido en la legislación ecuatoriana.',
              textoBoton: 'Postular',
              textSvg: "<svg width='50' height='50' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='50' height='50' rx='5' fill='#FEBE10'/><g clip-path='url(#clip0_25_11)'><path d='M24.9999 17C26.4727 17 27.6666 15.8061 27.6666 14.3333C27.6666 12.8606 26.4727 11.6667 24.9999 11.6667C23.5272 11.6667 22.3333 12.8606 22.3333 14.3333C22.3333 15.8061 23.5272 17 24.9999 17Z' fill='#024272'/><path d='M34.3334 26.3333V23.6667C32.2801 23.6933 30.2134 22.6667 28.9067 21.2267L27.1867 19.32C26.9601 19.0667 26.6801 18.8667 26.3734 18.72C26.3601 18.72 26.3601 18.7067 26.3467 18.7067H26.3334C25.8667 18.44 25.3334 18.3067 24.7467 18.36C23.3467 18.48 22.3334 19.72 22.3334 21.12V29C22.3334 30.4667 23.5334 31.6667 25.0001 31.6667H31.6667V38.3333H34.3334V31C34.3334 29.5333 33.1334 28.3333 31.6667 28.3333H27.6667V23.7333C29.3867 25.16 32.0001 26.32 34.3334 26.3333ZM26.1067 33C25.5601 34.5467 24.0801 35.6667 22.3334 35.6667C20.1201 35.6667 18.3334 33.88 18.3334 31.6667C18.3334 29.92 19.4534 28.4533 21.0001 27.8933V25.1333C17.9601 25.7467 15.6667 28.44 15.6667 31.6667C15.6667 35.3467 18.6534 38.3333 22.3334 38.3333C25.5601 38.3333 28.2534 36.04 28.8667 33H26.1067Z' fill='#024272'/></g><defs><clipPath id='clip0_25_11'><rect width='32' height='32' fill='white' transform='translate(9 9)'/></clipPath></defs></svg>",
              svg: '',
              ruta: '/auth/grantrequirements',
            },
            {
              id: 'nivelIngreso',
              titulo: 'Nivel de Ingresos',
              categoria: 'Apoyo económico',
              dirigido: 'Estudiantes que por su nivel de ingresos familiares no pueden cubrir el costo de matrícula en su totalidad. ',
              textoBoton: 'Postular',
              textSvg: "<svg width='50' height='50' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='50' height='50' rx='5' fill='#FEBE10'/><g clip-path='url(#clip0_359_363)'><path d='M25.0001 11.6667C17.6401 11.6667 11.6667 17.64 11.6667 25C11.6667 32.36 17.6401 38.3333 25.0001 38.3333C32.3601 38.3333 38.3334 32.36 38.3334 25C38.3334 17.64 32.3601 11.6667 25.0001 11.6667ZM25.0001 35.6667C19.1201 35.6667 14.3334 30.88 14.3334 25C14.3334 19.12 19.1201 14.3333 25.0001 14.3333C30.8801 14.3333 35.6667 19.12 35.6667 25C35.6667 30.88 30.8801 35.6667 25.0001 35.6667ZM26.1867 23.8C23.8134 23.0133 22.6667 22.52 22.6667 21.2667C22.6667 19.9067 24.1467 19.4133 25.0801 19.4133C26.8267 19.4133 27.4667 20.7333 27.6134 21.2L29.7201 20.3067C29.5201 19.72 28.6267 17.76 26.1734 17.3333V15.6667H23.8401V17.3467C20.3734 18.0933 20.3467 21.1467 20.3467 21.2933C20.3467 24.32 23.3467 25.1733 24.8134 25.7067C26.9201 26.4533 27.8534 27.1333 27.8534 28.4133C27.8534 29.92 26.4534 30.56 25.2134 30.56C22.7867 30.56 22.0934 28.0667 22.0134 27.7733L19.8001 28.6667C20.6401 31.5867 22.8401 32.3733 23.8267 32.6133V34.3333H26.1601V32.68C26.8534 32.56 30.1867 31.8933 30.1867 28.3867C30.2001 26.5333 29.3867 24.9067 26.1867 23.8Z' fill='#024272'/></g><defs><clipPath id='clip0_359_363'><rect width='32' height='32' fill='white' transform='translate(9 9)'/></clipPath></defs></svg>",
              svg: '',
              ruta: '/auth/grantrequirements',
            },
            {
              id: 'familiar',
              titulo: 'Familiar',
              categoria: 'Estratégica',
              dirigido: 'A la comunidad universitaria que tenga un familiar directo inscrito en la institución.',
              textoBoton: 'Renovar',
              textSvg: "<svg width='50' height='50' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='50' height='50' rx='5' fill='#FEBE10'/><g clip-path='url(#clip0_30_57)'><path d='M30.3334 14.3333C30.3334 12.8533 31.5201 11.6667 33.0001 11.6667C34.4801 11.6667 35.6667 12.8533 35.6667 14.3333C35.6667 15.8133 34.4801 17 33.0001 17C31.5201 17 30.3334 15.8133 30.3334 14.3333ZM35.6667 38.3333V30.3333H39.0001L35.6134 20.16C35.2401 19.0667 34.2267 18.3333 33.0801 18.3333H32.9201C31.7734 18.3333 30.7467 19.0667 30.3867 20.16L29.2401 23.6C30.6801 24.4 31.6667 25.9067 31.6667 27.6667V38.3333H35.6667ZM25.6667 24.3333C26.7734 24.3333 27.6667 23.44 27.6667 22.3333C27.6667 21.2267 26.7734 20.3333 25.6667 20.3333C24.5601 20.3333 23.6667 21.2267 23.6667 22.3333C23.6667 23.44 24.5601 24.3333 25.6667 24.3333ZM16.3334 17C17.8134 17 19.0001 15.8133 19.0001 14.3333C19.0001 12.8533 17.8134 11.6667 16.3334 11.6667C14.8534 11.6667 13.6667 12.8533 13.6667 14.3333C13.6667 15.8133 14.8534 17 16.3334 17ZM19.0001 38.3333V29H21.0001V21C21.0001 19.5333 19.8001 18.3333 18.3334 18.3333H14.3334C12.8667 18.3333 11.6667 19.5333 11.6667 21V29H13.6667V38.3333H19.0001ZM27.6667 38.3333V33H29.0001V27.6667C29.0001 26.5733 28.0934 25.6667 27.0001 25.6667H24.3334C23.2401 25.6667 22.3334 26.5733 22.3334 27.6667V33H23.6667V38.3333H27.6667Z' fill='#024272'/></g><defs><clipPath id='clip0_30_57'><rect width='32' height='32' fill='white' transform='translate(9 9)'/></clipPath></defs></svg>",
              svg: '',
              ruta: '/auth/grantrequirements',
            },
            {
              id: 'deportistasDestacados',
              titulo: 'Deportistas Destacados',
              categoria: 'Excelencia',
              dirigido: 'Estudiantes deportistas de alto rendimiento o federados.',
              textoBoton: 'Postular',
              textSvg: "<svg width='50' height='50' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='50' height='50' rx='5' fill='#FEBE10'/><path d='M25.0001 35.6667C26.6667 35.6667 28.0834 35.0833 29.2501 33.9167C30.4167 32.75 31.0001 31.3333 31.0001 29.6667C31.0001 28 30.4167 26.5833 29.2501 25.4167C28.0834 24.25 26.6667 23.6667 25.0001 23.6667C23.3334 23.6667 21.9167 24.25 20.7501 25.4167C19.5834 26.5833 19.0001 28 19.0001 29.6667C19.0001 31.3333 19.5834 32.75 20.7501 33.9167C21.9167 35.0833 23.3334 35.6667 25.0001 35.6667ZM21.1001 21.9333C21.5445 21.6889 22.0167 21.4944 22.5167 21.35C23.0167 21.2055 23.5223 21.1111 24.0334 21.0667L20.6667 14.3333H17.3334L21.1001 21.9333ZM28.9001 21.9333L32.7001 14.3333H29.3334L25.9667 21.0667C26.4779 21.1111 26.9834 21.2055 27.4834 21.35C27.9834 21.4944 28.4556 21.6889 28.9001 21.9333ZM17.5334 34.0667C17.1556 33.4222 16.8612 32.7278 16.6501 31.9833C16.439 31.2389 16.3334 30.4667 16.3334 29.6667C16.3334 28.8667 16.439 28.0944 16.6501 27.35C16.8612 26.6055 17.1556 25.9111 17.5334 25.2667C16.6001 25.5778 15.8334 26.1278 15.2334 26.9167C14.6334 27.7055 14.3334 28.6222 14.3334 29.6667C14.3334 30.7111 14.6334 31.6278 15.2334 32.4167C15.8334 33.2055 16.6001 33.7555 17.5334 34.0667ZM32.4667 34.0667C33.4001 33.7555 34.1667 33.2055 34.7667 32.4167C35.3667 31.6278 35.6667 30.7111 35.6667 29.6667C35.6667 28.6222 35.3667 27.7055 34.7667 26.9167C34.1667 26.1278 33.4001 25.5778 32.4667 25.2667C32.8445 25.9111 33.139 26.6055 33.3501 27.35C33.5612 28.0944 33.6667 28.8667 33.6667 29.6667C33.6667 30.4667 33.5612 31.2389 33.3501 31.9833C33.139 32.7278 32.8445 33.4222 32.4667 34.0667ZM25.0001 38.3333C24.1112 38.3333 23.2612 38.2055 22.4501 37.95C21.639 37.6944 20.889 37.3444 20.2001 36.9C20.0001 36.9444 19.8001 36.9722 19.6001 36.9833C19.4001 36.9944 19.189 37 18.9667 37C16.9445 37 15.2223 36.2889 13.8001 34.8667C12.3779 33.4444 11.6667 31.7222 11.6667 29.7C11.6667 27.7667 12.3112 26.1111 13.6001 24.7333C14.889 23.3555 16.4779 22.5889 18.3667 22.4333L13.0001 11.6667H22.3334L25.0001 17L27.6667 11.6667H37.0001L31.6667 22.3667C33.5556 22.5444 35.139 23.3222 36.4167 24.7C37.6945 26.0778 38.3334 27.7333 38.3334 29.6667C38.3334 31.7111 37.6223 33.4444 36.2001 34.8667C34.7779 36.2889 33.0445 37 31.0001 37C30.8001 37 30.5945 36.9944 30.3834 36.9833C30.1723 36.9722 29.9667 36.9444 29.7667 36.9C29.0779 37.3444 28.3334 37.6944 27.5334 37.95C26.7334 38.2055 25.889 38.3333 25.0001 38.3333ZM25.0001 33L23.9667 30.7L21.6667 29.6667L23.9667 28.6333L25.0001 26.3333L26.0334 28.6333L28.3334 29.6667L26.0334 30.7L25.0001 33Z' fill='#024272'/></svg>",
              svg: '',
              ruta: '/auth/grantrequirements',
            },
            {
              id: 'excelenciaAcademica',
              titulo: 'Excelencia Académica',
              categoria: 'Excelencia',
              dirigido: 'Estudiantes actuales de la UTPL destacados en cada una de las carreras por su alto rendimiento académico.',
              textoBoton: 'Probabilidad 80%',
              textSvg: "<svg width='50' height='50' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='50' height='50' rx='5' fill='#FEBE10'/><g clip-path='url(#clip0_31_83)'><path d='M15.6667 26.5733V30.32C15.6667 31.2933 16.2 32.2 17.0534 32.6667L23.72 36.3067C24.52 36.7467 25.48 36.7467 26.28 36.3067L32.9467 32.6667C33.8 32.2 34.3334 31.2933 34.3334 30.32V26.5733L26.28 30.9733C25.48 31.4133 24.52 31.4133 23.72 30.9733L15.6667 26.5733ZM23.72 13.6933L12.48 19.8267C11.56 20.3333 11.56 21.6667 12.48 22.1733L23.72 28.3067C24.52 28.7467 25.48 28.7467 26.28 28.3067L37 22.4533V30.3333C37 31.0667 37.6 31.6667 38.3334 31.6667C39.0667 31.6667 39.6667 31.0667 39.6667 30.3333V21.7867C39.6667 21.2933 39.4 20.8533 38.9734 20.6133L26.28 13.6933C25.48 13.2667 24.52 13.2667 23.72 13.6933Z' fill='#024272'/></g><defs><clipPath id='clip0_31_83'><rect width='32' height='32' fill='white' transform='translate(9 9)'/></clipPath></defs></svg>",
              svg: '',
              ruta: '/auth/grantrequirements',
            }
  ]

  sanatizeItems(): void {
    for (let i = 0; i < this.cards.length; i++) {
      this.cards[i].svg = this.sanitizer.bypassSecurityTrustHtml(this.cards[i].textSvg);
    }
  }
}