import { Component, OnDestroy, OnInit, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.scss']
})
export class PropertiesPageComponent implements OnDestroy, OnInit {
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

  public counter = signal(10); // Propiedad para demostrar los efectos

  // Vamos a usar esto para demostrar la limpieza automática del efecto
  ngOnInit(): void {
    setInterval(() => {
      // Esto provcará que cada segundo el counter se incrementará en 1
      this.counter.update(current => current + 1);

      // Si esto no tuviera una limpieza automática, cuando yo pasara a otro componente como por ejemplo /signals/user-info
      // El efecto seguiría ejecutándose. Sin embargo, si paso a otro componente y luego vuelvo aquí, el contador empieza desde 10, o sea, que el efecto se está limpiando automáticamente
      // Ojo! El setInterval sigue, lo que se limpia es el efecto
    }, 1000)
  }

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

  // Efectos con señales
  // Los efectos son una forma de disparar un "efecto secundario" o acción cuando una o varias señales cambian
  // Los efectos podemos crearlo como una propiedad tipo computed o fuera del componente
  // Usualmente lo tendremos dentro de servicios o de componentes
  // La ventaja de hacerlo dentro de servicios o componentes propios de Angular implica que haya una limpieza automática de todo
  // El efecto actúa parecido a una propiedad computada, y dentro habrá un callback que será la función a ejecutar
  public userChangedEffect = effect(() => {
    // Aquí la función a ejecutar tras el cambio de la señal
    // Primero se ejecutará cuando el componente se crea y luego cuando se hace un cambio a una señal que esté siendo referenciada
    console.log("userChangedEffect");

    // Cada vez que el contador o el el first_name cambien, este efecto se ejecutará puesto que estas variables están referenciadas en este efecto
    console.log(`${this.user().first_name} - ${this.counter()}`);

    // Si cambia otra propiedad que no esté referenciada aquí, esto no se disparará
  });

  ngOnDestroy(): void {
    // this.userChangedEffect.destroy(); // Con esto eliminaríamos el efecto manualmente para que no se siga disparando
  }

  increaseBy(value: number) {
    this.counter.update(current => current + value);
  }
}