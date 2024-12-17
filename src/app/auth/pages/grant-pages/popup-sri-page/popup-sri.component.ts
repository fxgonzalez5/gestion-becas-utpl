import { Component } from '@angular/core';


@Component({
  templateUrl: './popup-sri.component.html',
  styleUrls: ['./popup-sri.component.css'],
})

export default class PopupSRIPageComponent {
  pasos = [{
    texto: '2. Seleccione el apartado de RUC',
  },
  {
    texto: '3. Seguidamente escoja certificados',
  },
  {
    texto: '4. Ingrese con sus credenciales (En el caso de no conocer su clave, genere una nueva)',
  },
  {
    texto: '5. En el menú lateral izquierdo seleccione certificados',
  },
  {
    texto: '6. Por útimo, genere el único certiicado que le permita',
  }]
}