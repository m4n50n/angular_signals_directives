import { Component, computed, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.scss']
})
export class PropertiesPageComponent {
  // User signal
  public user = signal<User>({
    id: 1,
    email: "george.bluth@reqres.in",
    first_name: "George",
    last_name: "Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg"
  });

  // Propiedad computada fullName
  public fullName = computed(() => `${this.user().first_name} ${this.user().last_name}`);

  onFieldUpdated(field: keyof User, value: string) {
    console.log({ field, value });

    // Una forma de actualización de la señal user sería la siguiente (aunque potencialmente es algo inseguro puesto que se podría enviar una propiedad que no exista en el objeto y entonces este se crearía):
    // Para evitar esta inseguridad, el tipo de field sería keyof User, así restringimos que el campo debe existir en User

    // this.user.set({
    //   ...this.user(),
    //   [field]: value
    // })    

    // Mediante mutación:
    // currentUser es el valor actual del objeto user
    // Cualquier mutación que suceda en el objeto currentUser disparará un nuevo valor en la señal
    // En este caso no retornamos nada, sino que cualquier modificación disparará la notificación a todos los elementos que estén escuchando la señal
    this.user.mutate(currentUser => {
      // Esto sería más seguro porque evaluamos cada columna y su tipo de dato
      switch (field) {
        case 'email':
          currentUser.email = value;
          break;

        case 'first_name':
          currentUser.first_name = value;
          break;

        case 'last_name':
          currentUser.last_name = value;
          break;

        case 'id':
          currentUser.id = Number(value);
          break;
      }
    });

    // Mediante Update:
    // Esto no sería del todo correcto porque si envio un id, el campo sería Number y por lo tanto no sería el mismo tipo de dato
    // En el Update, lo que retornemos será el nuevo valor de la señal
    this.user.update(currentUser => {
      return { ...currentUser, [field]: value };
    })
  }
}