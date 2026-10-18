# FLOW FIT — Gestión de productos y stock

Aplicación web desarrollada como proyecto final de JavaScript para gestionar productos de indumentaria deportiva.

El simulador está orientado a la administración del negocio: permite consultar productos, cargar nuevos artículos, modificar sus datos y eliminarlos. No incluye un circuito de compra, registro de usuarios ni pagos

## Funcionalidades 

- Visualización dinámica de productos.
- Búsqueda por nombre.
- Alta de productos con nombre, precio y stock.
- Edición de productos y cancelación de la edición.
- Eliminación individual de productos.
- Vaciado de la lista.
- Validación de nombre obligatorio, precio mayor que cero y stock entero mayor o igual a cero.
- Persistencia de la lista mediante localStorage.
- Carga inicial de productos desde un archivo JSON mediante fetch.
- Manejo de errores de carga y visualización de los datos guardados cuando están disponibles.
- Notificaciones mediante Toastify.
- Interfaz adaptable a pantallas de computadora y celular.

## Tecnologías utilizadas

- HTML5
- CSS3 y Flexbox
- JavaScript
- Manipulación del DOM y eventos
- localStorage
- Fetch API y JSON
- async/await y try/catch/finally
- Toastify

## Cómo ejecutar el proyecto localmente

1. Descargar o clonar el repositorio.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Tener instalada la extensión Live Server.
4. Hacer clic derecho sobre index.html y seleccionar “Open with Live Server”.
5. Usar la aplicación desde la dirección que se abre en el navegador.

Es necesario ejecutarla mediante un servidor local para permitir la carga del archivo JSON con fetch.

Toastify se carga desde un CDN, por lo que requiere conexión a Internet.

## Almacenamiento de los datos

- En la primera visita, si no existe una lista guardada, se utilizan los productos de data/data.json.

- Al agregar, editar, eliminar o vaciar productos, la lista actualizada se guarda en localStorage bajo la clave “productos”.

- Los cambios se conservan al recargar la página en el mismo navegador y origen. No modifican el archivo JSON.

- Al vaciar la lista se guarda un array vacío, por lo que los productos iniciales no reaparecen al recargar.
