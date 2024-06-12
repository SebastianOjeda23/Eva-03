import { db } from "./firebase.js";
import {addDoc,collection,getDocs,doc,updateDoc,deleteDoc} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js"
export const registrarPersona = async(persona)=>{
    const docRef = await addDoc(collection(db,"persona"),persona)
}
;

export const obtenerPersona = async()=>{
    //recupera la referencia (ruta)
    const ref = collection(db,"persona");
    //recuperar una captura de la base de datos
    const qSnap = await getDocs(ref);
    let listado = []
    qSnap.forEach((doc)=>{
        console.log(doc.data());
        listado.push({...doc.data(),id:doc.id});
    });
    console.log(listado);
    return listado;
}