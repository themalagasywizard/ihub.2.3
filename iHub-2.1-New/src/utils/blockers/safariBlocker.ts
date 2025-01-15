export const blockSafariSpecific = () => {
  if (!navigator.userAgent.includes('Safari')) return;

  // Prevent touch events on potential popup/overlay elements
  document.addEventListener('touchstart', (e) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('[class*="popup"]') ||
      target.closest('[class*="overlay"]') ||
      target.closest('[class*="banner"]') ||
      target.closest('[class*="modal"]')
    ) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, { capture: true, passive: false });

  // Add Safari-specific CSS
  const style = document.createElement('style');
  style.textContent = `
    /* Block common Safari-specific prompts */
    div[class*="ios-prompt"],
    div[class*="smart-banner"],
    div[class*="app-banner"],
    div[class*="safari-banner"] {
      display: none !important;
      opacity: 0 !important;
      pointer-events: none !important;
      height: 0 !important;
      position: fixed !important;
      top: -999px !important;
    }

    /* Ensure body remains scrollable */
    html, body {
      position: static !important;
      overflow: auto !important;
      overscroll-behavior: none !important;
      touch-action: manipulation !important;
    }
  `;
  document.head.appendChild(style);
};