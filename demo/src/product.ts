function fetchProduct() {
  return new Promise((resolve, reject) => {
    fetch("https://fakestoreapi.com/products/100")
      .then((res) => res.json())
      .then((data) => data ? resolve(data) : reject(new Error("No data")))
      .catch((err) => reject(err))
  })
}

export function renderProduct(rootEl: HTMLDivElement) {
  rootEl.innerHTML = 'Loading...'

  fetchProduct()
    .then((product: any) => {
      rootEl.innerHTML = `
        <h1>${product.title}</h1>
        <img src="${product.image}" alt="${product.title}" />
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
      `
    })
    .catch((err) => {
      rootEl.innerHTML = `
        <h1>Error</h1>
        <p>${err.message}</p>
      `
    })
}
