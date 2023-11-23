
const contenedorProductos = document.querySelector("#contenedor-productos");
const btnCategorias = document.querySelectorAll(".btn-categoria");
let btnAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
        
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

    cargarProductos(data);

    btnCategorias.forEach(boton => {
        boton.addEventListener("click", (e) => {
            
            btnCategorias.forEach(boton => boton.classList.remove("active"));
            e.currentTarget.classList.add("active");

            if (e.currentTarget.id != "todos"){
                const productosBoton = data.filter(producto => producto.categoria.id === e.currentTarget.id);
                cargarProductos(productosBoton);
            } else {
                cargarProductos(data);
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
        const productoAgregado = data.find(producto => producto.id === idBoton);

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
})