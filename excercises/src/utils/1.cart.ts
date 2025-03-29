// Viết unit test kiểm tra các trường hợp: giỏ hàng rỗng, có một sản phẩm, nhiều sản phẩm, sản phẩm có số lượng lớn.

export type Product = {
  product_id: number;
  price: number;
  quantity: number;
};

export function calculatePrice(product: Product) {
  const priceNumber = Number(product.price) || 0;
  const quantityNumber = Number(product.quantity) || 0;

  return priceNumber * quantityNumber;
}

export function calculateTotalPrice(products: Product[]) {
  return products.reduce((total, product) => {
    return total + calculatePrice(product);
  }, 0);
}
