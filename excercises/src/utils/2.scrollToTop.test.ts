import { vi } from 'vitest';
import { useScrollToTop, ScrollOptions } from './2.scrollToTop';

describe('useScrollToTop', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should scroll to top with default options', () => {
    const scrollToMock = vi.fn();
    const mockElement = {
      scrollTo: scrollToMock,
    } as unknown as HTMLElement;

    const { scrollToTop } = useScrollToTop(mockElement);
    scrollToTop();

    expect(scrollToMock).toHaveBeenCalledTimes(1);
    expect(scrollToMock).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: 0,
      left: 0,
    });
  });

  it('should scroll to top with custom options', () => {
    const scrollToMock = vi.fn();
    const mockElement = {
      scrollTo: scrollToMock,
    } as unknown as HTMLElement;

    const customOptions: ScrollOptions = {
      behavior: 'auto',
      top: 100,
      left: 50,
    };

    const { scrollToTop } = useScrollToTop(mockElement, customOptions);
    scrollToTop();

    expect(scrollToMock).toHaveBeenCalledTimes(1);
    expect(scrollToMock).toHaveBeenCalledWith({
      behavior: 'auto',
      top: 0,
      left: 0,
    });
  });

  it('should use document.documentElement if no element is provided', () => {
    const scrollToMock = vi.fn();
    const mockDocumentElement = {
      scrollTo: scrollToMock,
    } as unknown as HTMLElement;

    vi.spyOn(document, 'documentElement', 'get').mockReturnValue(mockDocumentElement);

    const { scrollToTop } = useScrollToTop();
    scrollToTop();

    expect(scrollToMock).toHaveBeenCalledTimes(1);
    expect(scrollToMock).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: 0,
      left: 0,
    });
    vi.restoreAllMocks();
  });

  it('should handle multiple calls', () => {
    const scrollToMock = vi.fn();
    const mockElement = {
      scrollTo: scrollToMock,
    } as unknown as HTMLElement;

    const { scrollToTop } = useScrollToTop(mockElement);
    scrollToTop();
    scrollToTop();
    scrollToTop();

    expect(scrollToMock).toHaveBeenCalledTimes(3);
    expect(scrollToMock).toHaveBeenNthCalledWith(1, {
      behavior: 'smooth',
      top: 0,
      left: 0,
    });
    expect(scrollToMock).toHaveBeenNthCalledWith(2, {
      behavior: 'smooth',
      top: 0,
      left: 0,
    });
    expect(scrollToMock).toHaveBeenNthCalledWith(3, {
      behavior: 'smooth',
      top: 0,
      left: 0,
    });
  });
});
