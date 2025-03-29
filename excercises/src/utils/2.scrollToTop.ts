export function useScrollToTop(element: HTMLElement = document.documentElement, options: ScrollOptions = { behavior: 'smooth' }) {
  function scrollToTop() {
    element.scrollTo({
      ...options,
      top: 0,
      left: 0,
    });
  }

  return {
    scrollToTop,
  }
}


// use spyOn to mock scrollTo method