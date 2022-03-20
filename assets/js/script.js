//consumo de la api de fake store api

const url = 'https://fakestoreapi.com/products/'
const getProducts = async () => {
    const res = await fetch(url)
    const data = await res.json()
    const products = data.map(product =>{ 
        product.cartCounter = 0
        product.stock = product.rating.count
        return product})
    //salvado en Local Storage
    localStorage.setItem('products', JSON.stringify(products))
    return products
    }
// Chequeo de del grid de productos en Local Storage para evitar null
const checkLS = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : getProducts()
// Renderizado del grid de productos

const productRender = async () => {
    const products = await checkLS
    let html = ''
    for (const product of products) {
          html += '<div>'
          html += '<div class="subdiv">'
          html += `<img src="${product.image}" alt="${product.description}"><hr>`
          html += '</div>'
          html += `<h1>$${product.price}</h1>`
          html += `<p>Stock: ${product.stock}</p>`
          html += `<button id="buy" data-id="${product.id}">buy</button>`
          html += `<p>${product.title}</p>`
          html += '</div>'

        }
    productContainer.innerHTML = html
    }
      
// Chequeo de el carrito de compras en Local Storage para evitar null
let cart = localStorage.getItem('shopCart') ? JSON.parse(localStorage.getItem('shopCart')) : []
let total = localStorage.getItem('total') || 0
// Accion de agregado al carrito
const buyProduct = (id) => {
  const product = checkLS.find((product)=> product.id === id)
  product.stock--
  total = total + product.price
  if (product.cartCounter === 0){
  product.cartCounter++
  cart.push(product)
    }else{
    product.cartCounter++
    }
  localStorage.setItem('total', total)  
  localStorage.setItem('shopCart', JSON.stringify(cart))
}
// Accion de borrado del carrito 
const removeProduct = (id) => {
  const product = checkLS.find((product)=> product.id === id)
  total = total - product.price
  product.cartCounter--
  product.stock++
  if (product.cartCounter <= 0){
  cart.splice(cart.indexOf(product), 1)
  }
  localStorage.setItem('total', total)
  localStorage.setItem('shopCart', JSON.stringify(cart))
}
// Renderizado del carrito de compras
const shopCartRender = async () => {
  let html = ''
  for (let product of cart) {
    html += '<div>'
    html += `<p>${product.title} $${product.price} </p>`
    html += `<button id="remove" data-id="${product.id}">Remove</button>`
    html += `${product.cartCounter} `    
    html += `<hr>`
    html += '</div>'

  }
  shopCartContainer.innerHTML = html
}

// Renderizado del total de venta
const totalRender = () => {
    let html = ''
      html += '<div>'
      html += `<h1>Total Amount:</h1>`
      html += `<h1>$${total}</h1>`       
      html += `<button id="sale" data-id="sale">Checkout</button>`
      html += `<hr>`
      html += '</div>'

    totalContainer.innerHTML = html
  }
// rederizado al inicio de las funciones al inicio de la carga
document.addEventListener('DOMContentLoaded', () => {
    productRender()
    shopCartRender()
    totalRender()
  })
// Escuchador de eventos click 
  wrapper.addEventListener('click', (e) => {
  
    if(e.target.matches('#buy')) {
      const id = e.target.dataset.id
      buyProduct(+id)
      shopCartRender()
      productRender()
      totalRender()
    }
  
    if(e.target.matches('#remove')) {
      const id = e.target.dataset.id
      removeProduct(+id)
      shopCartRender()
      productRender()
      totalRender()

    }
    if(e.target.matches('#sale')) {
        alert('Your purchase was successful.')
        localStorage.clear();
        window.location.replace("/thankyou.html");
      }
  })
