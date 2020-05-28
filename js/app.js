//variables
const presupuestoUsuario = prompt('Cuál es tu presupuesto semanal?');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;




//Class
//Class de presupuesto
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
    //método para ir restando del presupuesto actual
    presupuestoRestante(cantidad = 0) {
        return this.restante -= Number(cantidad);
    }
}
//Clase interfaz maneja todo lo relacionado con HTML
class Interfaz {
    insertarPresupuesto(cantidad) {
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        //insetar al HTML
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }
    imprimirMensaje(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
            
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        //insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);
        //quitar alert despues de 3 seg
        setTimeout(function() {
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000);
    }    
    //inserta los gastos a la lista
    agregarGastoListado(nGasto, cGasto) {
        const gastosListado = document.querySelector('#gastos ul');

        // crear un LI
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        // insertar el gasto
        li.innerHTML = `
            ${nGasto}
            <span class="badge badge-primary badge-pill">$ ${cGasto} </span>
        `;
    //insertar al HTML
    gastosListado.appendChild(li);
    console.log(nGasto);
    console.log(cGasto);
 }
 

 //comprueba el presupuesto restante
 presupuestoRestante(cantidad) {
     const restante = document.querySelector('#restante');
     //leemos el presupuesto restante
     const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);

     restante.innerHTML = `${presupuestoRestanteUsuario}`;
     this.comprobarPresupuesto();
 }
 //cambia de color el presupuesto restante
 comprobarPresupuesto() {
    const presupuestoTotal = cantidadPresupuesto.presupuesto;
    const presupuestoRestante = cantidadPresupuesto.restante;
    
    //comprobar el 25% del gasto
    if((presupuestoTotal / 4) > presupuestoRestante) {
        const restante = document.querySelector('.restante');
        restante.classList.remove('alert-success', 'alert-warning');
        restante.classList.add('alert-danger');
    } else if((presupuestoTotal / 2) > presupuestoRestante) {
        const restante = document.querySelector('.restante');
        restante.classList.remove('alert-success');
        restante.classList.add('alert-warning');
    }
  }
}



//Event Listeners (2 ó 3 las clases tienen casi todo)
document.addEventListener('DOMContentLoaded', function() {
    if(presupuestoUsuario === null || presupuestoUsuario === '') {
        window.location.reload();
    } else {
        //Instanciar un presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        //instanciar la clase de interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});
formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    
    //leer del formulario de gasto
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    //instanciar la interfaz
    const ui = new Interfaz();

    //comprobar que los campos no esten vacío

if(nombreGasto === ''|| cantidadGasto === '') {
    //2 parametros mensaje y tipo
    ui.imprimirMensaje('Hubo un error', 'error');
} else {
    //insertar en el HTML
    ui.imprimirMensaje('Correcto', 'correcto');
    ui.agregarGastoListado(nombreGasto, cantidadGasto);
    ui.presupuestoRestante(cantidadGasto);
}
});
