
window.addEventListener("load",()=>{
    document.getElementById("btnRegistro").addEventListener("click",registrar);
    cargarDatos();
})

const registrar = ()=>{
    let eNombre = document.getElementById("NombreCliente");
    let eApellido = document.getElementById("ApellidoCliente");
    let eRut = document.getElementById("RutCliente");
    let eFechaEntrega = document.getElementById("FechaEntrega");
    let eNombreJuego = document.getElementById("NombreJuego");
    let eCompaniaJuego = document.getElementById("CompañiaJuego");
    let eCantidadCopias = document.getElementById("CopiaJuegos");
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
    console.log(objeto)
}   





let colorOriginal = true;

function cambiarContraste() {
    const body = document.body;

    if (colorOriginal) {
        body.style.backgroundColor = "black";
        body.style.color = "white";
    } else {
        body.style.backgroundColor = "white";
        body.style.color = "black";
    }

    colorOriginal = !colorOriginal;
}
//Esta funcion nos permite cambiar el color de la pagina y el contraste de esta

