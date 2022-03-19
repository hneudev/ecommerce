//consumo de la api de fake store api

const url = 'https://fakestoreapi.com/products/'
const getProducts = async () => {
    const res = await fetch(url)
    const data = await res.json()
    const products = data.map(product =>{ return product})
    //salvado en Local Storage
    localStorage.setItem('products', JSON.stringify(products))
    return products
    }
// Chequeo de Local Storage para evitar null
const checkLS = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : getProducts()
// Renderizado del grid de productos

const productRender = async () => {
    const products = await getProducts()
    let html = ''
    for (const product of products) {
          html += '<div>'
          html += `<img src="${product.image}" alt="${product.description}">`
          html += `<h4>${product.title}</h4>`
          html += `<h4>$${product.price}</h4>`
          html += `<button id="buy" data-id="${product.id}">buy</button>`
          html += '</div>'
        }
    productContainer.innerHTML = html
    }
      
productRender()


let cart = localStorage.getItem('shopCart') ? JSON.parse(localStorage.getItem('shopCart')) : []

const buyProduct = (id) => {
  const product = checkLS.find((product)=> product.id === id)
  cart.push(product)
  localStorage.setItem('shopCart', JSON.stringify(cart))
}

const removeProduct = (id) => {
  const product = checkLS.find((product)=> product.id === id)
  cart.splice(cart.indexOf(product), 1)
  localStorage.setItem('shopCart', JSON.stringify(cart))
}

const shopCartRender = async () => {
  let html = ''
  for (let product of cart) {
    html += '<div>'
    // html += `<img src="${product.image}" alt="${product.description}">`
    html += `<h4>${product.title}</h4>`
    html += `<h4>$${product.price}</h4>`
    html += `<button id="remove" data-id="${product.id}">X</button>`
    html += '</div>'
  }
  shopCartContainer.innerHTML = html
}

document.addEventListener('DOMContentLoaded', () => {
    productRender()
    shopCartRender()
  })
  
  wrapper.addEventListener('click', (e) => {
  
    if(e.target.matches('#buy')) {
      const id = e.target.dataset.id
      buyProduct(+id)
      shopCartRender()
    }
  
    if(e.target.matches('#remove')) {
      const id = e.target.dataset.id
      removeProduct(+id)
      shopCartRender()
    }
  })