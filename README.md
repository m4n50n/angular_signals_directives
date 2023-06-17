# Angular - De cero a experto: *Directivas personalizadas* y *Signals* (Angular 16+)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

## Docs
- <u>Directivas</u>
https://angular.io/guide/built-in-directives
https://angular.io/guide/attribute-directives
https://angular.io/guide/structural-directives
<br>
- <u>Signals (Señales)</u>
https://angular.io/guide/signals

### Directivas
Las directivas son clases que agregan comportamientos adicionales a los elementos en una aplicacion de Angular para, por ejemplo, administrar formularios, listas, estilos y lo que ven los usuarios.

En esta práctica crearemos directivas personalizadas en Angular para expandir el comportamiento de elementos.

La idea será crear una directiva robusta que nos sirva para resumir la forma en cómo los errores en los formularios son mostrados, y así no tener que colocar infinidad de condiciones dentro del HTML.

Llamaremos ***host*** al elemento sobre el que aplicaremos una directiva. Por ejemplo:
```html
<span appCustomLabel></span>
```

En este caso, el *span* es host de la directiva *appCustomLabel*.

La directiva recibirá valores a través de un @Input() que funcionará como propiedad y setter.

### Signals (Señales)
Angular Signals es un sistema que realiza un seguimiento granular de cómo y dónde se usa su estado en una aplicación, lo que permite que el marco optimice las actualizaciones de representación.

Es una forma de llegar directamente a donde estamos usando una variable o un valor de una variable y actualizarla o renderizarla, etc...

### Development server
Run npm start for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.