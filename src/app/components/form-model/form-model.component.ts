import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-model',
  templateUrl: './form-model.component.html',
  styleUrls: ['./form-model.component.css']
})
export class FormModelComponent implements OnInit {

  formulario: FormGroup;

  constructor() {
    this.formulario = new FormGroup({
      // recibo como primer parametro el valor y como segundo los validadores (expresiones regulares, como las de las contraseñas)
      nombre: new FormControl('',[ 
        Validators.required, 
        Validators.minLength(3) 
      ]),
      apellidos: new FormControl('', [
        Validators.required, 
        Validators.minLength(5)
      ]),
      edad: new FormControl('', [
        Validators.required,
        this.edadValidator
      ]),
      email: new FormControl('', [
        Validators.required,
        // Validators.email
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      ]),
      dni: new FormControl('',[
        // this.dniValidator,
        this.dniValidatorJuan
      ]),
      password: new FormControl(),
      repitePassword: new FormControl()

      // estas validaciones son a nivel formulario
    }, [this.passwordValidator]);
   }

  ngOnInit(): void {
  }

  recogerDatos(){
  }

  checkControl(controlName: string, errorName:string): boolean{
    if (this.formulario.get(controlName)?.hasError(errorName) && this.formulario.get(controlName)?.touched){
      return true;
    } else { 
      return false;
    }
  }
  
  edadValidator(controlName: AbstractControl){
    const value = parseInt(controlName.value);
    const min = 18;
    const max = 65;
    if (value >= min && value <= max){
      return null;
    } else {
      return { edadValidator: {min, max, value}}
    }
  }

  /* crear uan funcion de validador de dni */
  dniValidator(control: AbstractControl){
    const value = control.value;
    const codigo = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const dniRex = /^\d{8}[a-zA-Z]$/;

    if(!dniRex.test(value)){
      return { dniValidator: 'El formato es incorrecto'};
    }

    const parteNumerica = value.slice(0, 8);
    const letra = value.slice(8);

    const posicionLetra = parseInt(parteNumerica) % 23;
    const letraValida = codigo.slice(posicionLetra, posicionLetra + 1);

    if (letra.toUpperCase() === letraValida) {
      return null;
    }else {
      return { dniValidator: 'La letra no es valida'};
    }
  }

  // RESOLUCION HECHA POR JUAN
  dniValidatorJuan(control: AbstractControl){
    const dni = control.value;
    const conjLetras = "TRWAGMYFPDXBNJZSQVHLCKE";
    const expDni = /^\d{8}[a-zA-Z]$/

    if(expDni.test(dni)){
      const numero = dni.substr(0, dni.length -1); 
      const letra = dni.substr(dni.length-1, 1); 
      const calculo = numero % 23;

      
      console.log(letra.toUpperCase());
      console.log(conjLetras.split('')[calculo])
      if (letra.toUpperCase() !== conjLetras.split('')[calculo]){
        return { dniValidatorJuan: 'La letra no es valida' };
      } else {
        return null;
      }
    } else {
      return { dniValidatorJuan: 'El formato es incorrecto' };
    }
  }

  passwordValidator(form: AbstractControl){
    const passValue = form.get('password')?.value;
    const repitePassValue = form.get('repitePassword')?.value;
    if(passValue === repitePassValue){
      return null;
    } else {
      return { passwordValidator: true };
    }
  }
}
