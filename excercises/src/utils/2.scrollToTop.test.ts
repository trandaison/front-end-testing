import { describe, it, expect, vi } from "vitest";
import { useScrollToTop } from "./2.scrollToTop";

describe("useScrollToTop", () => {
  beforeAll(() => {
    Object.defineProperty(document.documentElement, "scrollTo", {
      value: vi.fn(),
      writable: true,
    });
  });

  it("should call scrollTo with correct parameters", () => {
    const mockElement = { scrollTo: vi.fn() } as unknown as HTMLElement;

    const { scrollToTop } = useScrollToTop(mockElement);
    scrollToTop();

    expect(mockElement.scrollTo).toHaveBeenCalledWith({
      behavior: "smooth",
      top: 0,
      left: 0,
    });
  });

  it("should use document.documentElement as default element", () => {
    const scrollSpy = vi.spyOn(document.documentElement, "scrollTo");

    const { scrollToTop } = useScrollToTop();
    scrollToTop();

    expect(scrollSpy).toHaveBeenCalledWith({
      behavior: "smooth",
      top: 0,
      left: 0,
    });

    scrollSpy.mockRestore();
  });
});
