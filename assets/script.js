import { ActualizarPersona,eliminarPersona,obtenerPersona,registrarPersona } from "./promesas.js";

window.addEventListener("load",()=>{
    document.getElementById("btnRegistro").addEventListener("click",registrar);
    cargarDatos();
    document.getElementById("btnActualizar").addEventListener("click",actualizar);
})

const registrar = ()=>{
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
            estructura += "<td>"+p.credito+"</td>"
            estructura += "<td>"+p.efectivo+"</td>" 
            estructura += "<td><button id='UPD"+p.id+"'>Actualizar</button></td>"
            estructura += "<td><button id='DEL"+p.id+"'>Eliminar</button></td>"
            estructura += "</tr>"
        })
        document.getElementById("CuerpoTabla").innerHTML = estructura;
        
        persona.forEach((p)=>{
            let elemento = document.getElementById("UPD"+p.id);
            elemento.addEventListener("click",()=>{
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
                document.getElementById("btnActualizar").value =p.id;
            });
            let btnEliminar = document.getElementById("DEL"+p.id);
            btnEliminar.addEventListener("click",()=>{
                if(confirm("Desea eliminar el pedido de: \n"+p.nombre+" "+p.apellido)){
                    console.log("vamos a eliminar")
                    eliminarPersona(p.id).then(()=>{
                        alert("eliminaste con exito!")
                        cargarDatos();
                    }).catch((e)=>{
                        console,log(e)
                    })
                    
                }else(
                    console.log("cancelaste la eliminacion")
                )
            })
        })
    })
}

const actualizar = ()=>{
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
    console.log(e)
}).finally(()=>{
    document.getElementById("btnActualizar").disabled = ""
})
}

