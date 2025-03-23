import './style.css'
import { renderProduct } from './product.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="product"></div>
`

renderProduct(document.querySelector<HTMLDivElement>('#product')!)
