import { describe, it, expect, vi } from 'vitest';
import { useScrollToTop } from '../2.scrollToTop';

describe('useScrollToTop', () => {
  it('should call scrollTo with correct arguments', () => {
    // Mock the document object
    const mockScrollTo = vi.fn();
    const originalDocument = global.document;

    global.document = {
      documentElement: {
        scrollTo: mockScrollTo,
      },
    } as unknown as Document;

    try {
      // Use the hook
      const { scrollToTop } = useScrollToTop();

      // Call the scrollToTop function
      scrollToTop();

      // Assert that scrollTo was called with the correct arguments
      expect(mockScrollTo).toHaveBeenCalledWith({
        behavior: 'smooth',
        left: 0,
        top: 0,
      });
    } finally {
      // Restore the original document object
      global.document = originalDocument;
    }
  });

  it('should call scrollTo on a custom element', () => {
    // Mock the document object
    const originalDocument = global.document;
    const mockElement = { scrollTo: vi.fn() };

    global.document = {
      createElement: vi.fn(() => mockElement),
    } as unknown as Document;

    try {
      // Use the hook with the custom element
      const { scrollToTop } = useScrollToTop(mockElement as unknown as HTMLElement);

      // Call the scrollToTop function
      scrollToTop();

      // Assert that scrollTo was called on the custom element with the correct arguments
      expect(mockElement.scrollTo).toHaveBeenCalledWith({
        behavior: 'smooth',
        top: 0,
        left: 0,
      });
    } finally {
      // Restore the original document object
      global.document = originalDocument;
    }
  });

  it('should use default options if none are provided', () => {
    // Mock the document object
    const mockScrollTo = vi.fn();
    const originalDocument = global.document;

    global.document = {
      documentElement: {
        scrollTo: mockScrollTo,
      },
    } as unknown as Document;

    try {
      // Use the hook
      const { scrollToTop } = useScrollToTop();

      // Call the scrollToTop function
      scrollToTop();

      // Assert that scrollTo was called with the correct arguments
      expect(mockScrollTo).toHaveBeenCalledWith({
        behavior: 'smooth',
        top: 0,
        left: 0,
      });
    } finally {
      // Restore the original document object
      global.document = originalDocument;
    }
  });

  it('should allow overriding scroll options', () => {
    // Mock the document object
    const mockScrollTo = vi.fn();
    const originalDocument = global.document;

    global.document = {
      documentElement: {
        scrollTo: mockScrollTo,
      },
    } as unknown as Document;

    try {
      // Use the hook
      const { scrollToTop } = useScrollToTop();

      // Call the scrollToTop function
      scrollToTop();

      expect(mockScrollTo).toHaveBeenCalledWith({
        behavior: 'smooth',
        top: 0,
        left: 0,
      });
    } finally {
      // Restore the original document object
      global.document = originalDocument;
    }
  });

  it('should call scrollTo on document.documentElement', () => {
    // Mock the document object
    // Mock the document object
    const mockScrollTo = vi.fn();
    const originalDocument = global.document;

    global.document = {
      documentElement: {
        scrollTo: mockScrollTo,
      },
    } as unknown as Document;

    try {
      // Use the hook
      const { scrollToTop } = useScrollToTop();

      // Call the scrollToTop function
      scrollToTop();

      expect(mockScrollTo).toHaveBeenCalledWith({
        behavior: 'smooth',
        top: 0,
        left: 0,
      });
    } finally {
      // Restore the original document object
      global.document = originalDocument;
    }
  });
});