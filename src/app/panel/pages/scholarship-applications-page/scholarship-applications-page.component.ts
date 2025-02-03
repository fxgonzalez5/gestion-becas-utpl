import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  imports: [CommonModule],
  templateUrl: './scholarship-applications-page.component.html',
  styleUrl: './scholarship-applications-page.component.css',
})
export default class ScholarshipApplicationsPageComponent {
  public headers = signal([
    'AÑO', 'PERÍODO', 'MODALIDAD', 'TIPO DE BECA', 'FECHA DE SOLICITUD',
    'ESTADO DE SOLICITUD', 'OBSERVACIONES', 'ACCIONES', 'FORMULARIO'
  ]);

  public data = signal([
    {
      year: 2023, period: 'Octubre - Febrero', modality: 'Presencial',
      scholarshipType: 'Nivel de Ingresos', applicationDate: '19 de Junio',
      status: 'Beca Asignada', observations: 'Observación'
    },
    {
      year: 2024, period: 'Abril - Agosto', modality: 'Presencial',
      scholarshipType: 'Deportistas Destacados', applicationDate: '04 de Enero',
      status: null, observations: null
    }
  ]);

  public datosTabla = [{
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
