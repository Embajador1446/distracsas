let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);


const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-Productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-accion-vaciar");
const contenedorTotal = document.querySelector("#total");


function cargarProductosCarrito (){
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(productos => {
            const div = document.createElement("div")
            div.classList.add("carrito-producto");
            div.innerHTML = `
            <img class="carrito-producto-imagen" height="100px" width="200px" src= "${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito-producto-titulo">
                <small>titulo</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carrito-producto-metraje">
                <small>Metraje</small>
                <h3>${producto.cantidad}</h3>
            </div>
            <div class="carrito-producto-valor">
                <small>valor x metro</small>
                 <h3>${producto.precio}</h3>
            </div>
            <div class="carrito-producto-subtotal">
                <small>valor sin iba</small>
                <h3>${producto.precio * producto.cantidad}</h3>
            </div>
            <button class="carrito-producto-borrar" id="${producto.id}"><i class="bi bi-trash3"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        });
    
    
    
    } else {
    
        contenedorCarritoVacio.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
    }

    actualizarBotonesEliminar();
    actualizarTotal ();

}

cargarProductosCarrito();

function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    })
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex (producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify (productosEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify (productosEnCarrito));
    cargarProductosCarrito();
}

function actualizarTotal () {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    Total.innerText = `$${totalCalculado}`; 
}
