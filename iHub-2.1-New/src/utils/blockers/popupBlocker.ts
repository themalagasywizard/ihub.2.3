export const blockPopups = () => {
  // Override window.open
  window.open = function() {
    return null;
  };

  // Block beforeunload events
  window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    return;
  }, { capture: true });

  // Block popstate events that might trigger navigation
  window.addEventListener('popstate', (event) => {
    event.stopImmediatiate = true;
  }, { capture: true });
};