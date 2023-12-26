//Simulador de prestamos.
//1- Ingresar nombre
//2- Ingresar edad
//3- Seleccionar tipo de prestamo.
//4- Indicar el monto que necesita.
//5- Indicar el tipo de financiación 12 / 24 / 36
//6- hacer el calculo mes a mes y mostrar por consola la cuota mensual.




let nombre;
let edad;
let tipoPrestamo;
let monto;
let financiamiento;
let cuotaValor;
let cuotaCantidad;

// Validadores

function validadorNombre(solicitante) {
    if (solicitante == "" || solicitante.length < 3) {
        return false
    } else {
        return true
    }
}
function validarEdad(edad) {
    if (edad < 18) {
        return false
    } else {
        return true;
    }
}
function validarCantidadDeCuotas(cuotas){
    if((cuotas == 12) || (cuotas == 24) || cuotas == 36){
        return cuotas;
    }
}

//Función general del prestamo.

function prestamo() {
    //1- Solicitar nombre

    do {
        nombre = prompt('Ingrese su nombre');
        if (!validadorNombre(nombre)) {
            alert('nombre invalido')
        }

    } while (!validadorNombre(nombre));

    //2- Solicitar edad

    do {
        edad = prompt('Ingrese su edad');
        if (!validarEdad(edad)) {
            alert('Eres menor de edad no puedes solicitar el prestamo')
        }else{
            alert(`Bienvenido ${nombre}, eres mayor de edad, puede solicitar el prestamo`)
        }
    } while (!validarEdad(edad));

    //3- Indicar el tipo de prestamo.

    do {
        cuotaCantidad = parseInt(prompt('En cuantas cuotas quiere sacar el prestamo 12, 24 o 36.'));
        if(!validarCantidadDeCuotas(cuotaCantidad)){
            alert('El prestamos solo se puede financiar en 12, 24 o 36 cuotas')
        }
    } while (!validarCantidadDeCuotas(cuotaCantidad));

    //4- Solicitar monto del prestamo
    monto = parseInt(prompt('Ingresar monto que desea solicitar'));

    //5- Calcular el valor de la cuota
    cuotaValor = monto / cuotaCantidad;

    //6- Mostrar el valor de la cuota mensual
   for (let i = 1; i <= cuotaCantidad; i++) {
     
    console.log(`Cuota ${[i]} - $${cuotaValor.toFixed(2)}`);
    
  }
    



}

prestamo();