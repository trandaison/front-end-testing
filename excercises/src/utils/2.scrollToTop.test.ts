import { vi } from "vitest";
import { useScrollToTop } from "./2.scrollToTop";

describe("scrollToTop", () => {
  describe(".scrollToTop", () => {
    it("should scroll to top of the page", () => {
      const element = {
        scrollTo: vi.fn(),
      } as unknown as HTMLElement;

      const scrollToTop = useScrollToTop(element);
      scrollToTop.scrollToTop();
      expect(element.scrollTo).toHaveBeenCalledWith({
        behavior: "smooth",
        top: 0,
        left: 0,
      });
    });
  });
});
