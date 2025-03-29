import { useScrollToTop } from './2.scrollToTop'
import { describe, it, expect, vi } from 'vitest';

describe('useScrollToTop', () => {
  it('should scroll the element to the top', () => {
    const mockScrollTo = vi.fn();
    const mockElement = { scrollTo: mockScrollTo } as unknown as HTMLElement;

    const { scrollToTop } = useScrollToTop(mockElement);

    scrollToTop();

    expect(mockScrollTo).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: 0,
      left: 0,
    });
  });

  it('should use document.documentElement as default element', () => {
    const mockScrollTo = vi.fn();
    document.documentElement.scrollTo = mockScrollTo

    const { scrollToTop } = useScrollToTop();

    scrollToTop();

    expect(mockScrollTo).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: 0,
      left: 0,
    });

    vi.restoreAllMocks();
  });
});