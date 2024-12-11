import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";


// Suponiendo que ya tienes configurado Firestore
const db = getFirestore();

export const checkData = async () => {
  try {
    // Realizamos una consulta buscando contactos con un puesto "No Existe"
    const q = query(collection(db, "contacts"), where("position", "==", "No Existe"));

    // Ejecutamos la consulta
    const querySnapshot = await getDocs(q);

    // Comprobamos si hay resultados
    if (querySnapshot.empty) {
      console.log("No se encontraron contactos con ese puesto.");
    } else {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    }
  } catch (error) {
    console.error("Error al realizar la consulta:", error);
  }
};


