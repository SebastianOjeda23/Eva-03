// Importar la instancia de Firebase Firestore desde la URL proporcionada
import { db } from "./firebase.js";
// Importar la configuración de Firebase
import {addDoc,collection,getDocs,doc,updateDoc,deleteDoc} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js"
export const registrarPersona = async(persona)=>{
        // Añadir un documento con los datos de la persona a la colección 'persona' en Firestore
    const docRef = await addDoc(collection(db, "persona"), persona)
}
;

export const obtenerPersona = async()=>{
    //Recupera la referencia (ruta)
    const ref = collection(db, "persona");
    //Recuperamos una captura de la bd
    const qSnap = await getDocs(ref);
        // Obtener una instantánea (snapshot) de todos los documentos en la colección
    let listado =  []
    qSnap.forEach((doc) =>{
        console.log(doc.data());
        listado.push({...doc.data(),id:doc.id});
    });
    console.log(listado);
    return listado;
}
export const ActualizarPersona = async(objeto,id)=>{
        // Obtener referencia al documento específico a actualizar en la colección 'persona'
    const ref = doc(db,"persona",id)
        // Actualizar el documento con los datos del objeto proporcionado
    await updateDoc(ref,objeto)
}
export const eliminarPersona = async(id)=>{
    // Obtener referencia al documento específico a eliminar en la colección 'persona'
    const ref = doc(db,"persona",id);
        // Eliminar el documento referenciado

    await deleteDoc(ref);
}