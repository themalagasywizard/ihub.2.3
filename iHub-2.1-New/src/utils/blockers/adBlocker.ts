import { adSelectors } from './constants';

export const removeAds = () => {
  adSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      element.remove();
    });
  });
};

export const blockInlineScripts = () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node: Node) => {
        if (node.nodeType === 1) {
          const element = node as HTMLElement;
          if (element.tagName === 'SCRIPT') {
            const src = element.getAttribute('src') || '';
            if (src.includes('ads') || src.includes('analytics') || src.includes('tracking')) {
              element.remove();
            }
          }
        }
      });
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
};