import { api } from "./utils.js";
import "./funcionesProducto.js"; // ????

// abrir el modal
export const modal = new bootstrap.Modal("#formulario-gestion", {

  keyboard: false,
});

document.addEventListener("DOMContentLoaded", function () {
  cargarDatosProducto();
  const form = document.querySelector("form");
  const { id, marca, referencia, nombre, genero, precio, imagen } = form.elements;

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que se recargue la página

    const data = {
      marca: marca.value,
      referencia: referencia.value,
      nombre: nombre.value,
      genero: genero.value,
      precio: precio.value,
      imagen: imagen.value,
    };
    

    // enviar los datos /// .????
    api({
      method: id.value ? "PUT" : "POST",
      url: id.value ? `/productos/${id.value}` : "/productos", // ?????
      data,
    })
      .then(({ data }) => {
        console.log(data); // preguntar
        Swal.fire("Exito", data.message, "success");
        cargarDatosProducto(); // Llamar función para actualizar la tabla con los datos del cliente nuevo
        form.reset();
        modal.hide();
      })
      .catch((err) =>
        Swal.fire("Error!", err?.response?.data?.message, "error")
      );
  });
});

export function cargarDatosProducto(pagina = 1) {
  
  const wrapper = document.querySelector("#card-wrapper");
  wrapper.innerHTML = ""; // ?
 
  // peticion a localhost:3000/clientes del server de node
  api.get(`/productos?page=${pagina}&perPage=9`).then(({ data }) => {

    for (const producto of data) { // ???
     // <const dataConverted = dayjs(cliente.fecha_nacimiento).format(
        //"DD-MM-YYYY"
      //);
      //- ?
      wrapper.innerHTML += ` 
        <div class="card">
          <div>
            <img
              src="${producto.imagen}"
              class="card-img-top"
              alt="..."
            />
          </div>
          <div class="card-body">
            <p class="card-text">
            <b>${producto.marca}</b>
            <p>${producto.nombre}</p>
            <p>$${producto.precio}</p>
          </div>
            <div class="d-grid gap-2">
              <button class="btn btn-primary" type="button" onclick="editarProducto(${producto.id})"  >Editar</button>
              <button class="btn btn-danger" type="button"  onclick="eliminarProducto(${producto.id})"  >Eliminar</button>
            </div>
          </div>
        </div>`;        
    }
  });
}
