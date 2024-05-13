
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
  const urlProducts ='./productos.json';
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
      domProductos(dataProducst);
      filtroGral(dataProducst);
      
    })
}



function filtroGral(valorFiltro) {
  let filtrado = document.getElementsByName('filtro');
  let filtrar = [];
  let valorSeleccionado;
  for (const iterator of filtrado) {
    iterator.addEventListener('click', () => {
      valorSeleccionado = iterator.value;
      if (!isNaN(valorSeleccionado) == false) {
        if (valorSeleccionado == "ver todos") {
          verProd.innerHTML = "";
          productos(valorFiltro);
          carrito(valorFiltro);

        } else {
          filtrar = valorFiltro.filter(prod => prod.categoria == valorSeleccionado)
          verProd.innerHTML = "";
          productos(filtrar)
          carrito(filtrar)

        }
      } else {
        filtrar = valorFiltro.filter(prod => prod.precio < valorSeleccionado)
        verProd.innerHTML = "";
        productos(filtrar)
        carrito(filtrar)
      }
    })
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
  carro.push(saveCarro);
  localStorage.setItem('savePro', JSON.stringify(carro));
}

function actualizarDom() {
  const prodTabla = document.getElementById('carrito_prod');
  const saveProd = JSON.parse(localStorage.getItem('savePro')) || [];
  prodTabla.innerHTML = "";
  for (i = 0; i < saveProd.length; i++) {
    prodTabla.innerHTML += `
            <tr>
                <td>${saveProd[i].id}</td>
                <td>${saveProd[i].nombre}</td>
                <td>${saveProd[i].precioCard}</td>
            </tr>
        `;
  }

}


function domProductos(listaProductos) {
  //Muestra productos
  //Filtros

  
  carrito(listaProductos);
  actualizarDom();


};
productos()