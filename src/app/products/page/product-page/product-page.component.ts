import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {
  // Esta es la manera común de hacer inyecciones.
  // constructor(private fb: FormBuilder) {}

  // Esta es una nueva manera de hacer inyecciones
  private fb = inject(FormBuilder); // Ojo! No estoy creando la instancia de FormBuilder, sólo inyectando la clase

  public color: string = "green";

  public myForm: FormGroup = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(6), Validators.email]]
  })

  changeColor() {
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    
    this.color = color;
  }
}
