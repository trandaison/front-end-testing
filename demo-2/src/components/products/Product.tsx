import { Star } from '../icons/Star';

interface IRating {
  rate: number;
  count: number;
}

export interface IProduct {
  id: string;
  title: string;
  price: number;
  image: string;
  rating: IRating;
}

interface IProductProps {
  product: IProduct;
  addToCart: (product: IProduct) => void;
}

export function Product({ product, addToCart }: IProductProps) {
  return (
    <div className="my-4 border rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300 hover:shadow-gray-400 dark:hover:shadow-gray-700">
      <a href="link" className="cursor-pointer">
        <figure>
          <img
            src={product.image}
            className="rounded-t h-72 md:h-60 w-full object-contain"
          />

          <figcaption className="p-4">
            <p className="truncate ... text-lg mb-2 font-bold leading-relaxed text-gray-800 dark:text-gray-300">
              {product.title}
            </p>

            <div className="flex justify-between items-center">
              <span className="flex">
                {Array(Math.floor(product.rating.rate))
                  .fill("")
                  .map((_, index) => (
                    <Star key={index} className="w-5 text-yellow-400 mr-1" />
                  ))}
              </span>
              <span className="font-bold text-xl text-gray-800">
                ${product.price}
              </span>
            </div>
            <small className="leading-5 text-gray-500 dark:text-gray-400">
              {product.rating.count} rating
            </small>
          </figcaption>
        </figure>
      </a>
      <div className="p-3 pt-0">
        <button
          type="button"
          className="w-full border border-gray-600 bg-gray-600 text-gray-200 rounded-md px-4 py-2 transition duration-300 ease select-none hover:bg-gray-800 hover:border-gray-800 focus:outline-none focus:shadow-outline"
          onClick={() => addToCart(product) }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
