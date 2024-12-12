import { deleteDB } from "idb";
import Swal from "sweetalert2";

export const deleteStore = async (): Promise<void> => {
    try {
        await deleteDB("ConectaTechDB");
        Swal.fire({
            title: "Actualizando",
            text: "Porfavor espere...",
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const timerInterval = setInterval(() => {
            Swal.close();
            clearInterval(timerInterval);
        }, 1500);

    } catch (error) {
        console.error("Error al intentar eliminar la base de datos local", error);
        Swal.fire({
            title: "Error al actualizar la base de datos",
            text: "Porfavor vuelve aintentarlo más tarde",
            icon: "error",
        });
    }
}