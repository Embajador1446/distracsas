// PRODUCTOS
const productos = [

    // MELAMINA
    {
        id: "rh-blanco",
        titulo: "melamina blanco",
        imagen: "./assets/imagenes/rh blanco.jpg",
        categoria: {
            nombre: "Madera",
            id: "melamina"
        },
        precio: 20000
    },
    {
        id: "rh-amaderado",
        titulo: "melamina-color",
        imagen: "./assets/imagenes/rh amaderados.jpg",
        categoria: {
            nombre: "Madera",
            id: "melamina"
        },
        precio: 20000
    },
    //CANTOS GENERAL
    {
        id: "cantos",
        titulo: "cantos",
        imagen: "./assets/imagenes/paleta de cantos.PNG",
        categoria: {
            nombre: "Canto",
            id: "paleta.cantos"
        },
        precio: 1000
    },
    //MDF POR LAMINA
    {
        id: "mdf09",
        titulo: "MDF 9mm",
        imagen: "./assets/imagenes/mdf 9mm.jpg",
        categoria: {
            nombre: "MDF9mm",
            id: "mdf"
        },
        precio: 15000
    },
    {
        id: "mdf12",
        titulo: "MDF 12mm",
        imagen: "./assets/imagenes/mdf12mm.jpg",
        categoria: {
            nombre: "MDF12mm",
            id: "mdf"
        },
        precio: 15000
    },
    {
        id: "mdf18",
        titulo: "MDF 18mm",
        imagen: "./assets/imagenes/mdf 18 mm.JPG",
        categoria: {
            nombre: "MDF18mm",
            id: "mdf"
        },
        precio: 15000
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonMenu = document.querySelectorAll(".boton-menu");
const tituloUno = document.querySelector("#titulo-uno");
let agregarMercancia = document.querySelectorAll(".agregar-mercancia");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {
    
    contenedorProductos.innerHTML = "" ;

    productosElegidos.forEach(producto => {

        const div = document.createElement("div")
        div.classList.add("masvendido");
        div.innerHTML = `
            <img class="masvendido-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="mercancia-detalles">
                <h3 class="mercancia-titulo">${producto.titulo}</h3>
                <p class="mercancia-precio">${producto.precio}</p>
                <button class="agregar-mercancia" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div)
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonMenu.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonMenu.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "masvendido") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloUno.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else{
            tituloUno.innerText = "Lo Mas Vendido";
            cargarProductos(productos);
        }
        

    })
});

function actualizarBotonesAgregar(){
    agregarMercancia = document.querySelectorAll(".agregar-mercancia");

    agregarMercancia.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse (productosEnCarritoLS);
    actualizarNumerito();
}else{
    productosEnCarrito = []
}


function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push (productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    numerito.innerText = nuevoNumerito  
}

