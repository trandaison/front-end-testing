// Viết unit test kiểm tra các trường hợp: giỏ hàng rỗng, có một sản phẩm, nhiều sản phẩm, sản phẩm có số lượng lớn.

export type Product = {
  product_id: number;
  price: number;
  quantity: number;
}

export function calculateTotalPrice(products: Product[]) {
  return products.reduce((total, product) => {
    return total + (product.price * product.quantity);
  }, 0);
}

// write test case for cart test of calculateTotalPrice
// ".calculateTotalPrice"