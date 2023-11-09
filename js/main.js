//PRODUCTOS

const productos = [
    {
        id: "abrigo-01",
        titulo: "Abrigo 01",
        imagen: "./multimedia/abrigo1.png",
        categoria: {
            nombre: "abrigos",
            id: "abrigos"
        },
        precio: 1000

    },
    {
        id: "abrigo-02",
        titulo: "Abrigo 02",
        imagen: "./multimedia/abrigo2.png",
        categoria: {
            nombre: "abrigos",
            id: "abrigos"
        },
        precio: 1000

    },
    {
        id: "abrigo-03",
        titulo: "Abrigo 03",
        imagen: "./multimedia/abrigo3.png",
        categoria: {
            nombre: "abrigos",
            id: "abrigos"
        },
        precio: 1000

    },
    {
        id: "abrigo-04",
        titulo: "Abrigo 04",
        imagen: "./multimedia/abrigo4.png",
        categoria: {
            nombre: "abrigos",
            id: "abrigos"
        },
        precio: 1000

    },
    {
        id: "camisa-01",
        titulo: "Remera 01",
        imagen: "./multimedia/camisa1.png",
        categoria: {
            nombre: "camisas",
            id: "camisas"
        },
        precio: 1000

    },
    {
        id: "camisa-02",
        titulo: "Remera 02",
        imagen: "./multimedia/camisa2.png",
        categoria: {
            nombre: "camisas",
            id: "camisas"
        },
        precio: 1000

    },
    {
        id: "camisa-03",
        titulo: "Remera 03",
        imagen: "./multimedia/camisa3.png",
        categoria: {
            nombre: "camisas",
            id: "camisas"
        },
        precio: 1000

    },
    {
        id: "camisa-04",
        titulo: "Remera 04",
        imagen: "./multimedia/camisa4.png",
        categoria: {
            nombre: "camisas",
            id: "camisas"
        },
        precio: 1000

    },
    {
        id: "pantalon-01",
        titulo: "Pantalon 01",
        imagen: "./multimedia/pantalon1.png",
        categoria: {
            nombre: "pantalones",
            id: "pantalones"
        },
        precio: 1000

    },
    {
        id: "pantalon-02",
        titulo: "Pantalon 02",
        imagen: "./multimedia/pantalon2.png",
        categoria: {
            nombre: "pantalones",
            id: "pantalones"
        },
        precio: 1000

    },
    {
        id: "pantalon-03",
        titulo: "Pantalon 03",
        imagen: "./multimedia/pantalon3.png",
        categoria: {
            nombre: "pantalones",
            id: "pantalones"
        },
        precio: 1000

    },
    {
        id: "pantalon-04",
        titulo: "Pantalon 04",
        imagen: "./multimedia/pantalon4.png",
        categoria: {
            nombre: "pantalones",
            id: "pantalones"
        },
        precio: 1000

    }
]

const contenedorProductos = document.querySelector("#contenedor-productos");
const btnCategorias = document.querySelectorAll(".btn-categoria");
let btnAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";
    
    productosElegidos.forEach(producto => {
        
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>    
            </div>  
        
        `
        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
    
}

cargarProductos(productos);

btnCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        
        btnCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos"){
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            cargarProductos(productos);
        }
        
    })
})

function actualizarBotonesAgregar(){
    btnAgregar = document.querySelectorAll(".producto-agregar");

    btnAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;
let productosEnCarritoLs = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLs){
    productosEnCarrito = JSON.parse(productosEnCarritoLs);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}
 

function agregarAlCarrito(e){

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    } 
    
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);

    numerito.innerText = nuevoNumerito;
}