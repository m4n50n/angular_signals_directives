import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter-page',
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.scss']
})
export class CounterPageComponent {
  public counter = signal(10); // Creación de señal con valor inicial 10

  // Creación de una señal computada de SOLO LECTURA
  // Pasaremos una función de computación
  public squareCounter = computed(() => this.counter() * this.counter());
  // Esto podría hacerse en RxJs, por ejemplo, con BehaviorSubject pero implicaría hacer muchas más cosas como subscribers, ngondestroy, etc...

  increaseBy(value: number) {
    // Forma 1 de actualizar el valor de la señal
    // this.counter.set(this.counter() + value);

    // Forma 2: a través de una función de actualización
    this.counter.update(currentValue => currentValue + value); // Lo que retorne la función será el nuevo valor
  }
}
