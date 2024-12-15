import { Component } from '@angular/core';
import NavPageComponent from "../nav-page/nav-page.component";
import FooterPageComponent from "../footer-page/footer-page.component";

@Component({
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.css'],
  imports: [NavPageComponent, FooterPageComponent]
})

export default class ApplicationPageComponent {


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

  cards = [{
              id: 'discapacidad',
              titulo: 'Discapacidad',
              categoria: 'Inclusión',
              dirigido: 'Estudiantes con discapacidad, de acuerdo a lo establecido en la legislación ecuatoriana.',
              textoBoton: 'Postular',
              svg: '../../../../assets/images/discapacidad.svg',
            },
            {
              id: 'nivelIngreso',
              titulo: 'Nivel de Ingresos',
              categoria: 'Apoyo económico',
              dirigido: 'Estudiantes que por su nivel de ingresos familiares no pueden cubrir el costo de matrícula en su totalidad. ',
              textoBoton: 'Postular',
              svg: '../../../../assets/images/nivelIngreso.svg',
            },
            {
              id: 'familiar',
              titulo: 'Familiar',
              categoria: 'Estratégica',
              dirigido: 'A la comunidad universitaria que tenga un familiar directo inscrito en la institución.',
              textoBoton: 'Renovar',
              svg: '../../../../assets/images/familiar.svg',
            },
            {
              id: 'deportistasDestacados',
              titulo: 'Deportistas Destacados',
              categoria: 'Excelencia',
              dirigido: 'Estudiantes deportistas de alto rendimiento o federados.',
              textoBoton: 'Postular',
              svg: '../../../../assets/images/deportistasDestacados.svg',
            },
            {
              id: 'excelenciaAcademica',
              titulo: 'Excelencia Académica',
              categoria: 'Excelencia',
              dirigido: 'Estudiantes actuales de la UTPL destacados en cada una de las carreras por su alto rendimiento académico.',
              textoBoton: 'Probabilidad 80%',
              svg: '../../../../assets/images/excelenciaAcademica.svg',
            }
  ]
}