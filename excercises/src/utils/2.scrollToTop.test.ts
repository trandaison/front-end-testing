import { describe, it, expect, vi, beforeEach } from "vitest";
import { useScrollToTop } from "./2.scrollToTop";

describe("useScrollToTop", () => {
  // Mock setup
  let mockElement: HTMLElement;

  beforeEach(() => {
    // Create a mock element with a scrollTo method
    mockElement = {
      scrollTo: vi.fn(),
    } as unknown as HTMLElement;

    // Reset document.documentElement mock for default parameter tests
    vi.spyOn(document, "documentElement", "get").mockReturnValue({
      scrollTo: vi.fn(),
    } as unknown as HTMLElement);
  });

  it("should call scrollTo with default parameters", () => {
    const docElement = document.documentElement;
    const scrollToSpy = vi.spyOn(docElement, "scrollTo");

    const { scrollToTop } = useScrollToTop();
    scrollToTop();

    expect(scrollToSpy).toHaveBeenCalledWith({
      behavior: "smooth",
      top: 0,
      left: 0,
    });
  });

  it("should call scrollTo on the provided element", () => {
    const { scrollToTop } = useScrollToTop(mockElement);
    scrollToTop();

    expect(mockElement.scrollTo).toHaveBeenCalledWith({
      behavior: "smooth",
      top: 0,
      left: 0,
    });
  });

  it("should call scrollTo with custom options", () => {
    const customOptions = { behavior: "auto" as const };

    const { scrollToTop } = useScrollToTop(mockElement, customOptions);
    scrollToTop();

    expect(mockElement.scrollTo).toHaveBeenCalledWith({
      behavior: "auto",
      top: 0,
      left: 0,
    });
  });

  it("should call scrollTo with merged options", () => {
    const customOptions = {
      behavior: "auto" as const,
      block: "start" as const,
    };

    const { scrollToTop } = useScrollToTop(mockElement, customOptions);
    scrollToTop();

    expect(mockElement.scrollTo).toHaveBeenCalledWith({
      behavior: "auto",
      block: "start",
      top: 0,
      left: 0,
    });
  });
});
