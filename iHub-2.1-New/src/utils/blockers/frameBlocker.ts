import { trustedDomains } from './constants';

export const protectIframes = () => {
  // Prevent iframe tampering
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLIFrameElement) {
          const originalSrc = node.getAttribute('src');
          
          // Only protect iframes if they're from our trusted domains
          if (originalSrc && trustedDomains.some(domain => originalSrc.includes(domain))) {
            Object.defineProperty(node, 'src', {
              get: function() {
                return this.getAttribute('src');
              },
              set: function(value) {
                // Allow src changes for trusted domains
                const isTrusted = trustedDomains.some(domain => value.includes(domain));
                if (isTrusted) {
                  this.setAttribute('src', value);
                }
              }
            });
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