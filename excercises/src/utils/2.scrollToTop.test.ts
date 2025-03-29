import * as UseScrollToTop from './2.scrollToTop';
import { describe, expect, it, vi } from 'vitest';

describe('scrollToTop', () => {
  it('should scroll to the top of the page', () => {
    const scrollToMock = vi.fn();
    const element = {
      scrollTo: scrollToMock,
    } as unknown as HTMLElement;

    const { scrollToTop } = UseScrollToTop.useScrollToTop(element);

    scrollToTop();

    expect(scrollToMock).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: 0,
      left: 0,
    });
  });
});