import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

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
    console.log("Directiva - Color: ", { color: value });

    this._color = value;
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    console.log("Directiva - Errors: ", { errors: value });

    this._errors = value;    
    this.setErrorMessage();
  }

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = "red";
  private _errors?: ValidationErrors | null;

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
    this.setErrorMessage();
  }

  setStyle(): void {
    if (!this.htmlElement) { return; }

    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    if (!this.htmlElement) { return; }

    if (!this._errors) {
      this.htmlElement!.nativeElement.innerHTML = "";
      return;
    }

    const errors = Object.keys(this._errors);
    console.log(errors);

    if (errors.includes("required")) {
      this.htmlElement!.nativeElement.innerHTML = "Campo obligatorio";
      return;
    }
    if (errors.includes("minlength")) {
      this.htmlElement!.nativeElement.innerHTML = "La longitud mínima es de " + this._errors["minlength"].requiredLength;
      return;
    }
    if (errors.includes("email")) {
      this.htmlElement!.nativeElement.innerHTML = "Email no válido";
      return;
    }
  }
}
