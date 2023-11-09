let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorProductos = document.querySelector("#carrito-productos");
const contenedorAcciones = document.querySelector("#carrito-acciones");
const contenedorComprado = document.querySelector("#carrito-comprado");
const btnVaciar = document.querySelector("#btn-vaciar");
const contenedorTotal = document.querySelector("#total")
const btnComprar = document.querySelector("#btn-comprar");
let btnEliminar = document.querySelectorAll(".carrito-producto-eliminar");


function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        
        contenedorCarritoVacio.classList.add("disable");
        contenedorProductos.classList.remove("disable");
        contenedorAcciones.classList.remove("disable");
        contenedorComprado.classList.add("disable");

        contenedorProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-img" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}">Borrar</button>
            `;

            contenedorProductos.append(div);
        })

    } else {

        contenedorCarritoVacio.classList.remove("disable");
        contenedorProductos.classList.add("disable");
        contenedorAcciones.classList.add("disable");
        contenedorComprado.classList.add("disable");

    }

    actualizarBotonesEliminar()
    actualizarTotal()
}


cargarProductosCarrito()


function actualizarBotonesEliminar(){
    btnEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    btnEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();
    
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
}


btnVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    productosEnCarrito.length = 0;

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerHTML = `$${totalCalculado}`;
}

btnComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
    productosEnCarrito.length = 0;

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();

    contenedorCarritoVacio.classList.add("disable");
    contenedorProductos.classList.add("disable");
    contenedorAcciones.classList.add("disable");
    contenedorComprado.classList.remove("disable");

}
