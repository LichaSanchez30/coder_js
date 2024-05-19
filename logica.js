
const verProd = document.getElementById('productos');
let carro = [];
let carritoGuardado = [];
// funtion productos
// function productos(array) {
//   for (const prod of array) {
//     verProd.innerHTML += `
//     <div class="card cardProduct" style="width: 18rem;">
//   <img src="${prod.img}" alt="...">
//   <div class="card-body">
//     <h5 class="card-title">${prod.nombre}</h5>
//     <p class="card-text">${prod.precioCard}</p>
//     <button class="btn btn-primary boton" id= ${prod.id}>Comprar</button>
//   </div>
// </div>

//     `
//   }
// }
function productos() {
  const urlProducts = './productos.json';
  fetch(urlProducts)
    .then((products) => products.json())
    .then((data) => {
      console.log(data)
      const dataProducst = data.productosDeportivos;
      for (const productsDom of dataProducst) {
        verProd.innerHTML += `
       <div class="card cardProduct" style="width: 18rem;">
      <img src="${productsDom.img}" alt="...">
      <div class="card-body">
      <h5 class="card-title">${productsDom.nombre}</h5>
      <p class="card-text">${productsDom.precioCard}</p>
      <button class="btn btn-primary boton" id= ${productsDom.id}>Comprar</button>
      </div>
      </div>
  `
      }
      domProductos(dataProducst)

    })
}


function filtroGral(valorFiltro) {
  const filtrado = document.getElementsByName('filtro');
  for (const iterator of filtrado) {
    iterator.addEventListener('click', () => {
      const valorSeleccionado = iterator.value;
      let filtrar = [];
      if (!isNaN(valorSeleccionado)) {
        filtrar = valorFiltro.filter(prod => prod.precio < parseFloat(valorSeleccionado));
      } else if (valorSeleccionado === "ver todos") {
        filtrar = valorFiltro;
      } else {
        filtrar = valorFiltro.filter(prod => prod.categoria === valorSeleccionado);
      }
      mostrarProductos(filtrar);
      carrito(filtrar)
    });
  }
}

function mostrarProductos(productosMostrar) {
  verProd.innerHTML = "";
  for (const producto of productosMostrar) {
    verProd.innerHTML += `
      <div class="card cardProduct" style="width: 18rem;">
        <img src="${producto.img}" alt="...">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.precioCard}</p>
          <button class="btn btn-primary boton" id="${producto.id}">Comprar</button>
        </div>
      </div>
    `;
  }
}
function carrito(prods) {
  //Agregar producto al carrito de compras.
  const btnComprar = document.getElementsByClassName('boton');
  for (const comprar of btnComprar) {
    comprar.addEventListener('click', () => {
      const aCarrito = prods.find(prod => prod.id == comprar.id);
      carritoLocal(aCarrito)
      actualizarDom();
      
    })
  }
}
function carritoLocal(saveCarro) {
  const productoExistente = carro.find(prod => prod.id == saveCarro.id);
  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    saveCarro.cantidad = 1;
    carro.push(saveCarro);
  }
  localStorage.setItem('savePro', JSON.stringify(carro));

}

function actualizarDom() {
   const total = document.getElementById('totalAPagar');
  const prodTabla = document.getElementById('carrito_prod');
  const saveProd = JSON.parse(localStorage.getItem('savePro')) || [];
  prodTabla.innerHTML = "";
  for (const iterator of saveProd) {
    if(iterator)
    prodTabla.innerHTML += `
            <tr>
                <td>${iterator.id}</td>
                <td>${iterator.nombre}</td>
                <td>${iterator.cantidad}</td>
                <td>${iterator.precioCard}</td>
                <td><button class='borrarProd'id='${iterator.id}'><i class="fa-sharp fa-solid fa-circle-xmark"></i></button></td>
            </tr>
        `;
    
   
  };
  const totalAPagar = saveProd.reduce((acumulador, elemento) => acumulador + (elemento.precio * elemento.cantidad), 0);
  total.innerText = totalAPagar;

  const btnEliminar = document.getElementsByClassName('borrarProd');
  for (const boton of btnEliminar) {
    boton.addEventListener('click', () => {
      eliminarProducto(boton.id);
    });
  }
  

}
function eliminarProducto(id) {
  const producto = carro.find(prod => prod.id == id);
  if (producto.cantidad > 1) {
    producto.cantidad -= 1;
  } else {
    carro = carro.filter(prod => prod.id != id);
  }
  localStorage.setItem('savePro', JSON.stringify(carro));
  actualizarDom();
}


function mostrarCarrito(){
  const btn_carrito = document.getElementById('btn-carrito');
  const contenedorCarrito = document.getElementById('carrito_compras');
  btn_carrito.addEventListener('click', ()=>{
      if(contenedorCarrito.style.display === 'flex'){
          contenedorCarrito.style.display = 'none';
      } else {
          contenedorCarrito.style.display = 'flex';
    }
  });

}

function domProductos(listaProductos) {
  //Muestra productos


  //Filtros

  filtroGral(listaProductos);
  carrito(listaProductos);
  actualizarDom();
  mostrarCarrito()

};


productos();


// function mostrarCarrito() {
//   const btn_carrito = document.getElementById('btn-carrito');
//   const contenedorCarrito = document.getElementById('carrito_compras');
//   btn_carrito.addEventListener('click', () => {
//       if (contenedorCarrito.style.display === 'none') {
//           contenedorCarrito.style.display = 'flex';
//       } else {
//           contenedorCarrito.style.display = 'none';
//       }
//   });
// }