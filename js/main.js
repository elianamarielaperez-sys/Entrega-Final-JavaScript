const inputNombre = document.querySelector("#nombreProducto");
const inputPrecio = document.querySelector("#precioProducto");
const inputStock = document.querySelector("#stockProducto");

const botonAgregar = document.querySelector("#btnAgregar");
const botonVaciar = document.querySelector("#btnVaciar");
const botonCancelarEdicion = document.querySelector("#btnCancelarEdicion");

const inputBusqueda = document.querySelector("#busquedaProducto");

const mensaje = document.querySelector("#mensaje");
const estadoCarga = document.querySelector("#estadoCarga");

const avisoBienvenida = document.querySelector("#avisoBienvenida");
const fondoOscuro = document.querySelector("#fondoOscuro");
setTimeout(() => {
    fondoOscuro.style.display = "block";
    avisoBienvenida.style.display = "block";
}, 3000);

const cerrarAviso = document.querySelector("#cerrarAviso");
cerrarAviso.addEventListener("click", () => {
    avisoBienvenida.style.display = "none";
    fondoOscuro.style.display = "none";
});

const contenedorProductos = document.querySelector("#contenedorProductos");

let idProductoEditando = null;

function renderizarProductos() {
    const busqueda = inputBusqueda.value.toLowerCase();
    let html = "";

    for (const producto of productos) {
        const { nombre, precio, stock } = producto;
        if (nombre.toLowerCase().includes(busqueda)) {
            html += `
            <div>
                <h3>${nombre}</h3>
                <p>$${precio}</p>
                <p>Stock: ${stock}</p>
                <button data-id="${producto.id}" class="btnEditar">Editar</button>
                <button data-id="${producto.id}" class="btnEliminar">Eliminar</button>
            </div>
        `;

        }

    }
    contenedorProductos.innerHTML = html;
}

inputBusqueda.addEventListener("input", () => {
    renderizarProductos();
});

contenedorProductos.addEventListener("click", (evento) => {
    if (!evento.target.matches("button")) return;

    const idProducto = Number(evento.target.dataset.id);

    if (evento.target.classList.contains("btnEditar")) {
        const producto = productos.find(
            producto => producto.id === idProducto
        );

        idProductoEditando = idProducto;

        inputNombre.value = producto?.nombre ?? "";
        inputPrecio.value = producto?.precio ?? "";
        inputStock.value = producto?.stock ?? "";

        botonAgregar.textContent = "Guardar cambios";
        botonCancelarEdicion.hidden = false;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        return;
    }

    if (!evento.target.classList.contains("btnEliminar")) return;

    const productoEncontrado = productos.findIndex(
        producto => producto.id === idProducto
    );

    if (productoEncontrado !== -1) {

        if (idProductoEditando === idProducto) {
            idProductoEditando = null;

            inputNombre.value = "";
            inputPrecio.value = "";
            inputStock.value = "";

            botonAgregar.textContent = "Agregar Producto";
            botonCancelarEdicion.hidden = true;
        }

        productos.splice(productoEncontrado, 1);
        guardarProductos();
        Toastify({
            text: "Producto eliminado correctamente",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "linear-gradient(to right, #7F00FF, #E100FF)"
            }
        }).showToast();
        renderizarProductos();
    }

});

botonCancelarEdicion.addEventListener("click", () => {
    idProductoEditando = null;

    inputNombre.value = "";
    inputPrecio.value = "";
    inputStock.value = "";

    botonAgregar.textContent = "Agregar Producto";
    botonCancelarEdicion.hidden = true;
});

botonAgregar.addEventListener("click", () => {
    const estabaEditando = idProductoEditando !== null;
    try {
        const nombre = inputNombre.value.trim();
        const precio = Number(inputPrecio.value);
        const stock = Number(inputStock.value);
        if (
            nombre === "" ||
            isNaN(precio) ||
            precio <= 0 ||
            inputStock.value.trim() === "" ||
            isNaN(stock) ||
            stock < 0 ||
            !Number.isInteger(stock)
        ) {
            throw new Error("Datos inválidos");
        }

        if (idProductoEditando !== null) {

            const producto = productos.find(
                producto => producto.id === idProductoEditando
            );

            producto.nombre = nombre;
            producto.precio = precio;
            producto.stock = stock;

            idProductoEditando = null;

        } else {
            const nuevoProducto = {
                id: siguienteId,
                nombre: nombre,
                precio: precio,
                stock: stock
            };
            siguienteId++;
            productos.push(nuevoProducto);
        }
        guardarProductos();

        Toastify({
            text: estabaEditando
                ? "Producto modificado correctamente"
                : "Producto agregado correctamente",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "linear-gradient(to right, #7F00FF, #E100FF)"
            }
        }).showToast();

        inputNombre.value = "";
        inputPrecio.value = "";
        inputStock.value = "";

        botonAgregar.textContent = "Agregar Producto";
        botonCancelarEdicion.hidden = true;

        renderizarProductos();

    } catch (error) {
        Toastify({
            text: estabaEditando
                ? "No se pudo modificar el producto"
                : "No se pudo agregar el producto",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "linear-gradient(to right, #FF416C, #FF4B2B)"
            }
        }).showToast();

        setTimeout(() => {
            Toastify({
                text: "Completá nombre, precio y stock correctamente",
                duration: 3000,
                gravity: "top",
                position: "center",
                style: {
                    background: "linear-gradient(to right, #FF416C, #FF4B2B)"
                }
            }).showToast();
        }, 1000);
    }
});

botonVaciar.addEventListener("click", () => {
    productos.length = 0;

    idProductoEditando = null;

    inputNombre.value = "";
    inputPrecio.value = "";
    inputStock.value = "";

    botonAgregar.textContent = "Agregar Producto";
    botonCancelarEdicion.hidden = true;

    guardarProductos();

    renderizarProductos();
    Toastify({
        text: "Productos eliminados correctamente",
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
            background: "linear-gradient(to right, #7F00FF, #E100FF)"
        }
    }).showToast();
});

async function getData() {
    botonAgregar.disabled = true;
    botonVaciar.disabled = true;

    try {
        estadoCarga.textContent = "Cargando productos...";
        const response = await fetch("./data/data.json");
        if (!response.ok) {
            throw new Error("Error al cargar los productos");
        }
        const data = await response.json();
        if (!productosGuardados) {
            productos = data;
            siguienteId = productos.length > 0
                ? Math.max(...productos.map(producto => producto.id)) + 1
                : 1;
        }

        renderizarProductos();

    } catch (error) {
        Toastify({
            text: "No se pudo cargar la lista inicial de productos",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "linear-gradient(to right, #FF416C, #FF4B2B)"
            }
        }).showToast();
        if (productosGuardados) {
            renderizarProductos();

            mensaje.textContent = "Se muestran los productos guardados en este navegador.";
        } else {
            mensaje.textContent = "No hay productos guardados para mostrar.";
        }

    } finally {
        estadoCarga.textContent = "";

        botonAgregar.disabled = false;
        botonVaciar.disabled = false;
    }
}
getData();
