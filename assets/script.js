import { ActualizarPersona,eliminarPersona,obtenerPersona,registrarPersona } from "./promesas.js";


window.addEventListener("load", () => {
    document.getElementById("toggle-contrast").onclick = () => {
        document.body.classList.toggle("dark-mode");
    };
//permite cambiar el contraste de la pagina
    document.getElementById("toggle-font-size").onclick = () => {
        document.body.classList.toggle("large-font");
    };
//Permite cambiar el tamaño de la letra en la pagina
    document.getElementById("btnRegistro").onclick = () => {
        const campos = ["NombreCliente", "ApellidoCliente", "RutCliente", "FechaEntrega", "NombreJuego", "CompañiaJuego", "Copiajuegos", "Direccion"];
        let valid = true;

        campos.forEach(id => {
            const campo = document.getElementById(id);
            if (campo.value.trim() === "") {
                campo.style.borderColor = "red";
                valid = false;
            } else {
                campo.style.borderColor = "";
            }
        });

        if (valid) {
            registrar();
        } else {
            alert("Por favor, complete todos los campos.");
        }
        //Valida si todos los campos estan completos o si faltan datos por rellenar y en caso de levanta una alerta a la pagina
        //si no es asi levanta una alerta y pone los marcos de los cuadros en rojo

    };

    cargarDatos();
    document.getElementById("btnActualizar").addEventListener("click", actualizar);
});

const registrar = ()=>{
    //obtiene referencias a los elementos del formulario
    let eNombre = document.getElementById("NombreCliente");
    let eApellido = document.getElementById("ApellidoCliente");
    let eRut = document.getElementById("RutCliente");
    let eFechaEntrega = document.getElementById("FechaEntrega");
    let eNombreJuego = document.getElementById("NombreJuego");
    let eCompaniaJuego = document.getElementById("CompañiaJuego");
    let eCantidadCopias = document.getElementById("Copiajuegos");
    let eDireccion = document.getElementById("Direccion");
    let eCredito = document.getElementById("credito");
    let eEfectivo = document.getElementById("efectivo");
    //obtiene los valores del formulario
    let vNombre = eNombre.value;
    let vApellido = eApellido.value;
    let vRut = eRut.value;
    let vFechaEntrega = eFechaEntrega.value;
    let vNombreJuego = eNombreJuego.value;
    let vCompaniaJuego = eCompaniaJuego.value;
    let vCantidadCopias = eCantidadCopias.value;
    let vDireccion = eDireccion.value;
    let vCredito = eCredito.checked; 
    let vEfectivo = eEfectivo.checked; 
    //crea un objeto con los valores obtenidos
    let objeto = {
        nombre: vNombre,
        apellido: vApellido,
        rut: vRut,
        FechaEntrega: vFechaEntrega,
        nombrejuego: vNombreJuego,
        companiajuego: vCompaniaJuego,
        copias: vCantidadCopias,
        direccion: vDireccion,
        credito: vCredito,
        efectivo: vEfectivo
    };
     // Llamar a la función registrarPersona con el objeto creado y manejar la respuesta
        // en caso de funcionar manda un mensaje de usuario
    registrarPersona(objeto).then(()=>{
        alert("Pedido realizado con excito!");
        cargarDatos()
    }).catch((error)=>{
        console.log(error)
    })
    
}   

const cargarDatos = ()=>{
    //Traer todo lo registrado
    obtenerPersona().then((persona)=>{
        console.log(persona)
        //cargarlo en la tabla del html
        let estructura = ""
        persona.forEach((p)=>{
            estructura += "<tr>"
            estructura += "<td>"+p.nombre+"</td>"
            estructura += "<td>"+p.apellido+"</td>"
            estructura += "<td>"+p.rut+"</td>"
            estructura += "<td>"+p.FechaEntrega+"</td>"
            estructura += "<td>"+p.nombrejuego+"</td>"
            estructura += "<td>"+p.companiajuego+"</td>"
            estructura += "<td>"+p.copias+"</td>"
            estructura += "<td>"+p.direccion+"</td>"
            estructura += "<td>" + (p.credito ? "Sí" : "No") + "</td>";
            estructura += "<td>" + (p.efectivo ? "Sí" : "No") + "</td>";
            estructura += "<td><button id='UPD"+p.id+"'>Actualizar</button></td>"
            estructura += "<td><button id='DEL"+p.id+"'>Eliminar</button></td>"
            estructura += "</tr>"
        })
        // Insertar la estructura generada en el cuerpo de la tabla
        document.getElementById("CuerpoTabla").innerHTML = estructura;
         // Asignar eventos a los botones de Actualizar y Eliminar
        persona.forEach((p)=>{


            let elemento = document.getElementById("UPD"+p.id);
                    // Obtener el botón de Actualizar y asignar evento click

            elemento.addEventListener("click",()=>{
                // Llenar los campos del formulario de actualización con los datos seleccionados
                document.getElementById("UPDNombreCliente").value =p.nombre;
                document.getElementById("UPDApellidoCliente").value =p.apellido;
                document.getElementById("UPDRutCliente").value =p.rut;
                document.getElementById("UPDFechaEntrega").value =p.FechaEntrega;
                document.getElementById("UPDNombreJuego").value =p.nombrejuego;
                document.getElementById("UPDCompañiaJuego").value =p.companiajuego;
                document.getElementById("UPDCopiajuegos").value =p.copias;
                document.getElementById("UPDDireccion").value =p.direccion;
                document.getElementById("UPDcredito").value =p.credito;
                document.getElementById("UPDefectivo").value =p.efectivo;
                document.getElementById("btnActualizar").value =p.id; //ASIGNAMOS EL ID AL OBJETO A ACTUALIZAR
            });
            //obtener el boton de eliminar y asignar el evento de click
            let btnEliminar = document.getElementById("DEL"+p.id);
            btnEliminar.addEventListener("click",()=>{
                //esto sirve para confirmar la eliminacion en la alerta
                if(confirm("Desea eliminar el pedido de: \n"+p.nombre+" "+p.apellido)){
                    console.log("vamos a eliminar") //mensaje de confirmacion dentro de la consola
                    eliminarPersona(p.id).then(()=>{ //alerta de eliminacion excitosa
                        alert("eliminaste con exito!") //alerta para confirmar que elimino con excito o para avisar
                        cargarDatos();
                    }).catch((e)=>{
                        console,log(e) 
                    })
                    
                }else(
                    console.log("cancelaste la eliminacion") //mensaje en caso de cancelar la eliminacion
                )
            })
        })
    })
}

const actualizar = ()=>{
    //obtener las referencias  a los elementos del formulario de actualizacion
    let eNombre = document.getElementById("UPDNombreCliente");
    let eApellido = document.getElementById("UPDApellidoCliente");
    let eRut = document.getElementById("UPDRutCliente");
    let eFechaEntrega = document.getElementById("UPDFechaEntrega");
    let eNombreJuego = document.getElementById("UPDNombreJuego");
    let eCompaniaJuego = document.getElementById("UPDCompañiaJuego");
    let eCantidadCopias = document.getElementById("UPDCopiajuegos");
    let eDireccion = document.getElementById("UPDDireccion");
    let eCredito = document.getElementById("UPDcredito");
    let eEfectivo = document.getElementById("UPDefectivo");

    //obtener los valores actuales de los campos del formulario de actualizacion
    let vNombre = eNombre.value;
    let vApellido = eApellido.value;
    let vRut = eRut.value;
    let vFechaEntrega = eFechaEntrega.value;
    let vNombreJuego = eNombreJuego.value;
    let vCompaniaJuego = eCompaniaJuego.value;
    let vCantidadCopias = eCantidadCopias.value;
    let vDireccion = eDireccion.value;
    let vCredito = eCredito.checked;  //verifica si el checkbox esta marcado
    let vEfectivo = eEfectivo.checked; // verifica si el checkbox esta marcado

    //se crea un objeto con los valores actualizados
    let objeto = {
        nombre: vNombre,
        apellido: vApellido,
        rut: vRut,
        FechaEntrega: vFechaEntrega,
        nombrejuego: vNombreJuego,
        companiajuego: vCompaniaJuego,
        copias: vCantidadCopias,
        direccion: vDireccion,
        credito: vCredito,
        efectivo: vEfectivo};
let id = document.getElementById("btnActualizar").value
//envia el objeto y el id a las promesas

//cargar algo tipo loading
document.getElementById("btnActualizar").disabled = "True";
ActualizarPersona(objeto,id).then(()=>{
    alert("Se actualizo con excito")
    cargarDatos();
    document.getElementById("btnActualizar").disabled = "";
}).catch((e)=>{
    console.log(e)//manejar el error que pueda  ocurrir durante la actualizacion 
}).finally(()=>{
    //habilita el boton nuevamente despues de finalizar el proceso
    document.getElementById("btnActualizar").disabled = ""
})
}

