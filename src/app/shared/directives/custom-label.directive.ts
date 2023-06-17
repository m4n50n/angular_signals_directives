import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appCustomLabel]'
})
export class CustomLabelDirective implements OnInit {
  private htmlElement?: ElementRef<HTMLElement>;

  constructor(private el: ElementRef<HTMLElement>) {
    console.log("Constructor de la directiva");
    console.log("Constructor de la directiva el:", el); // el apuntará al host de la directiva

    this.htmlElement = el;

    // Ejemplo de control del elemento host
    this.htmlElement.nativeElement.innerHTML = "Hola Mundo desde Directiva";
  }

  ngOnInit(): void {
    console.log("Directiva - ngOnInit");
  }
}
