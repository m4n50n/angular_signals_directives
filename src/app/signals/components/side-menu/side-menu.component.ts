import { Component, signal } from '@angular/core';

interface MenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  // public menuItems: MenuItem[] = [
  //   { title: "Contador", route: "counter" },
  //   { title: "Usuario", route: "user-info" },
  //   { title: "Mutaciones", route: "properties" }
  // ];

  // Crearemos la variable pero ya como una Señal. Pueden crearse de diferentes formas:

  // 1ª forma:
  public menuItems_ = signal(1); // Aquí, menuItems sería una señal que internamente va a manejar un número
  // De esta forma, cada vez que yo cambie el valor de esta señal, ella misma sabrá todos los lugares donde se esté usando este valor y se notificará
  // Esto hace que en el fondo haya menos renderizaciones, más velocidad, etc...
  // Aquí automáticamente siempre sabrá que internamente se manejará un número

  // 2ª forma:
  // De esta forma indicamos el tipo de dato que tendrá internamente la señal y el valor inicial que le daremos
  public menuItems = signal<MenuItem[]>([
    { title: "Contador", route: "counter" },
    { title: "Usuario", route: "user-info" },
    { title: "Mutaciones", route: "properties" }
  ]);
}
