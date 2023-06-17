import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCustomLabel]'
})
export class CustomLabelDirective implements OnInit {
  // El siguiente input no solo es una propiedad como si hiciera:
  // @Input() color: string;
  // Sino que se trata de una propiedad con un "setter" personalizado. El "setter" se define como una función color()
  // que recibe un parámetro value de tipo string
  // Cuando se asigna un valor a la propiedad color desde un componente padre, se invoca esta función
  // y se pasa el valor asignado  
  @Input() set color(value: string) {
    console.log("Directiva - Color recibido: ", { color: value });

    this._color = value;
    this.setStyle();
  }

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = "red";

  constructor(private el: ElementRef<HTMLElement>) {
    console.log("Constructor de la directiva");
    console.log("Constructor de la directiva el:", el); // el apuntará al host de la directiva

    this.htmlElement = el;

    // Ejemplo de control del elemento host
    // this.htmlElement.nativeElement.innerHTML = "Hola Mundo desde Directiva";
  }

  ngOnInit(): void {
    console.log("Directiva - ngOnInit");

    this.setStyle();
  }

  setStyle(): void {
    if (!this.htmlElement) { return; }

    this.htmlElement!.nativeElement.style.color = this._color;
  }
}
