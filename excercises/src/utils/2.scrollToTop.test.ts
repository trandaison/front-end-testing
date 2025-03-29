import { vi } from 'vitest';

import * as useScrollToTop from './2.scrollToTop';

describe('useScrollToTop', () => {
  describe('scrollToTop', () => {
    it('should scroll to the top of the element with default behavior', () => {
      const element = {
        scrollTo: vi.fn(),
      } as unknown as HTMLElement;

      const { scrollToTop } = useScrollToTop.useScrollToTop(element);

      scrollToTop();

      expect(element.scrollTo).toHaveBeenCalledWith({
        behavior: 'smooth',
        top: 0,
        left: 0,
      });
    })

    it('should scroll to the top of the element with auto behavior', () => {
      const element = {
        scrollTo: vi.fn(),
      } as unknown as HTMLElement;

      const options: ScrollOptions = {
        behavior: 'auto',
      };

      const { scrollToTop } = useScrollToTop.useScrollToTop(element, options);

      scrollToTop();

      expect(element.scrollTo).toHaveBeenCalledWith({
        ...options,
        top: 0,
        left: 0,
      });
    })

    it('should scroll to the top of the element with instant behavior', () => {
      const element = {
        scrollTo: vi.fn(),
      } as unknown as HTMLElement;

      const options: ScrollOptions = {
        behavior: 'instant',
      };

      const { scrollToTop } = useScrollToTop.useScrollToTop(element, options);

      scrollToTop();

      expect(element.scrollTo).toHaveBeenCalledWith({
        ...options,
        top: 0,
        left: 0,
      });
    })
  })
});