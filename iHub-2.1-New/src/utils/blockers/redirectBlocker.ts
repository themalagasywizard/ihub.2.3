import { trustedDomains } from './constants';

export const blockRedirects = () => {
  // Store original functions
  const originalAssign = window.location.assign;
  const originalReplace = window.location.replace;
  const originalHref = Object.getOwnPropertyDescriptor(window.location, 'href');

  // Block location.href changes
  Object.defineProperty(window.location, 'href', {
    set(value) {
      if (trustedDomains.some(domain => value.includes(domain))) {
        originalHref.set.call(this, value);
      }
      return value;
    },
    get() {
      return originalHref.get.call(this);
    }
  });

  // Block location.assign
  window.location.assign = function(url: string) {
    if (trustedDomains.some(domain => url.includes(domain))) {
      originalAssign.call(window.location, url);
    }
  };

  // Block location.replace
  window.location.replace = function(url: string) {
    if (trustedDomains.some(domain => url.includes(domain))) {
      originalReplace.call(window.location, url);
    }
  };

  // Block navigation events
  window.addEventListener('beforeunload', (e) => {
    const url = window.location.href;
    if (!trustedDomains.some(domain => url.includes(domain))) {
      e.preventDefault();
      e.returnValue = '';
    }
  }, true);

  // Block form submissions that might trigger redirects
  document.addEventListener('submit', (e) => {
    const form = e.target as HTMLFormElement;
    if (!trustedDomains.some(domain => form.action.includes(domain))) {
      e.preventDefault();
    }
  }, true);

  // Block programmatic navigation
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function(data: any, unused: string, url?: string | URL | null) {
    if (url && trustedDomains.some(domain => url.toString().includes(domain))) {
      originalPushState.call(this, data, unused, url);
    }
  };

  history.replaceState = function(data: any, unused: string, url?: string | URL | null) {
    if (url && trustedDomains.some(domain => url.toString().includes(domain))) {
      originalReplaceState.call(this, data, unused, url);
    }
  };
};