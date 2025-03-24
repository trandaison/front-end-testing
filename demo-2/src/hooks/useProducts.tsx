import { useEffect, useState } from 'react';

export const useProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    setLoading(true);

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading }
}
