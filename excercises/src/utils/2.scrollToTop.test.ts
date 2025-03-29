import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useScrollToTop } from './2.scrollToTop';

describe('useScrollToTop', () => {
  // Mock for HTMLElement
  let mockElement: HTMLElement;
  
  beforeEach(() => {
    // Reset mocks before each test
    mockElement = {
      scrollTo: vi.fn()
    } as unknown as HTMLElement;
  });

  it('should use document.documentElement when no parameters are provided', () => {
    global.document = {
      documentElement: {
        scrollTo: vi.fn()
      }
    } as unknown as Document;
    
    const { scrollToTop } = useScrollToTop();
    
    scrollToTop();
    
    expect(document.documentElement.scrollTo).toHaveBeenCalledTimes(1);
    expect(document.documentElement.scrollTo).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: 0,
      left: 0
    });
  });
  
  it('should call scrollTo with default options', () => {
    const { scrollToTop } = useScrollToTop(mockElement);
    
    scrollToTop();
    
    expect(mockElement.scrollTo).toHaveBeenCalledTimes(1);
    expect(mockElement.scrollTo).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: 0,
      left: 0
    });
  });
  
  it('should call scrollTo with custom options', () => {
    const customOptions = { behavior: 'auto' as const };
    const { scrollToTop } = useScrollToTop(mockElement, customOptions);
    
    scrollToTop();
    
    expect(mockElement.scrollTo).toHaveBeenCalledTimes(1);
    expect(mockElement.scrollTo).toHaveBeenCalledWith({
      behavior: 'auto',
      top: 0,
      left: 0
    });
  });
});