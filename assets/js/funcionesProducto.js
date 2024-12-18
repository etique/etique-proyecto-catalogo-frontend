import { cargarDatosProducto, modal } from "./script.js";
const form = document.querySelector("form");

window.editarProducto = function (id) {
  fetch("http://localhost:3000/productos/" + id)
    .then((response) => response.json())
    .then((data) => {
      const { id, marca, referencia, nombre, genero, precio, imagen, editar } = form.elements;

      // const dataConverted = dayjs(data.fecha_nacimiento).format("YYYY-MM-DD");

      id.value = data.id;
      marca.value = data.marca;
      referencia.value = data.referencia;
      nombre.value = data.nombre;
      genero.value = data.genero;
      precio.value = data.precio;
      imagen.value = data.imagen;

      modal.show()
    });
};

window.limpiarformulario = function () {
  form.reset();
};

window.eliminarProducto = function (id) {
  Swal.fire({
    title: "Estas seguro?",
    text: "No podras revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, borrar!",
    cancelButtonText: "Cancelar",
  }).then(function (result) {
    if (result.isConfirmed) {
      fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          Swal.fire("Eliminado!", data.message, "success");
          cargarDatosProducto();
        });
    }
  });
};
// paginacion

let pagina = 1;
const contador = document.querySelector("#paginacion h2");

window.paginaSiguiente = function () {
  
  pagina++;
  contador.innerText = pagina;
  cargarDatosProducto(pagina);
}

window.paginaAnterior = function () {
  if (pagina - 1 === 0) {
    Swal.fire("Error", "Esta es la primera pagina", "error");
  } else {
    pagina--;
    contador.innerText = pagina;
    cargarDatosProducto(pagina);
  }
}



