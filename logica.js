
const verProd = document.getElementById('productos');
let carro = [];
// funtion productos
function productos(array) {
  for (const prod of array) {
    verProd.innerHTML += `
    <div class="card cardProduct" style="width: 18rem;">
  <img src="${prod.img}" alt="...">
  <div class="card-body">
    <h5 class="card-title">${prod.nombre}</h5>
    <p class="card-text">${prod.precioCard}</p>
    <button class="btn btn-primary boton" id= ${prod.id}>Comprar</button>
  </div>
</div>
    
    `
  }
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
      const aCarrito = prods.find(prod => prod.id == comprar.id)
      prodACarrito(aCarrito);
    })
  }
}
function prodACarrito(carritoProd) {
  const prodTabla = document.getElementById('carrito_prod');
  carro.push(carritoProd);
  console.table(carro)
  prodTabla.innerHTML+=`
  <tr>
        <td>${carritoProd.id}</td>
        <td>${carritoProd.nombre}</td>
        <td>$${carritoProd.precio}</td>
    </tr>
  
  `

}
function domProductos(listaProductos) {
  //Muestra productos
  productos(listaProductos)
  
  //Filtros

  filtroGral(listaProductos)
  carrito(listaProductos)



};






domProductos(productosDeportivos)

