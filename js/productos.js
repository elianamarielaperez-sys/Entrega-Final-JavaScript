const productosGuardados = localStorage.getItem("productos");

let productos = productosGuardados
    ? JSON.parse(productosGuardados)
    : [];

let siguienteId = productos.length > 0
    ? Math.max(...productos.map(producto => producto.id)) + 1
    : 1;

function guardarProductos() {
    localStorage.setItem("productos", JSON.stringify(productos));
}


