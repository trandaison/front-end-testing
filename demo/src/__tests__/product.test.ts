import { renderProduct } from '../product';

describe('product.ts', () => {
  describe('#renderProduct', () => {
    let elProduct: HTMLDivElement;

    beforeEach(() => {
      elProduct = document.createElement('div');
      document.body.appendChild(elProduct);
    });

    afterEach(() => {
      document.body.removeChild(elProduct);
      vi.restoreAllMocks();
    });

    describe('when product is fetched successfully', () => {
      describe('when product has data', () => {
        it('should render product correctly', async () => {
          const productEl = document.createElement('div');
          renderProduct(productEl);

          const mockProduct = {
            title: 'Product 1',
            image: 'https://via.placeholder.com/150',
            description: 'Description 1',
            price: 100,
          }

          vi.spyOn(window, 'fetch').mockResolvedValue({
            json: () => Promise.resolve(mockProduct),
          } as any);
          renderProduct(productEl);
          expect(productEl.innerHTML).toContain('Loading...');
          await new Promise(setImmediate);
          expect(productEl.innerHTML).not.toContain('Loading...');
          expect(productEl.innerHTML).toContain(mockProduct.title);
          expect(productEl.innerHTML).toContain(mockProduct.image);
          expect(productEl.innerHTML).toContain(mockProduct.description);
          expect(productEl.innerHTML).toContain(mockProduct.price);
        });
      });

      describe('when product has no data', () => {
        it('should render error message', async () => {
          const productEl = document.createElement('div');
          renderProduct(productEl);

          vi.spyOn(window, 'fetch').mockResolvedValue({
            json: () => Promise.resolve(null),
          } as any);
          renderProduct(productEl);
          expect(productEl.innerHTML).toContain('Loading...');
          await new Promise(setImmediate);
          expect(productEl.innerHTML).not.toContain('Loading...');
          expect(productEl.innerHTML).toContain('Error');
          expect(productEl.innerHTML).toContain('No data');
        });
      });
    });

    describe('when product fetch failed', () => {
      it('should render error message', async () => {
        const productEl = document.createElement('div');
        renderProduct(productEl);

        vi.spyOn(window, 'fetch').mockRejectedValue(new Error('Fetch failed'));
        renderProduct(productEl);
        expect(productEl.innerHTML).toContain('Loading...');
        await new Promise(setImmediate);
        expect(productEl.innerHTML).not.toContain('Loading...');
        expect(productEl.innerHTML).toContain('Error');
        expect(productEl.innerHTML).toContain('Fetch failed');
      });
    });
  });
});
