import { removeAds, blockInlineScripts } from './adBlocker';
import { blockRedirects } from './redirectBlocker';
import { blockPopups } from './popupBlocker';
import { blockSafariSpecific } from './safariBlocker';
import { protectIframes } from './frameBlocker';

export const initializeBlockers = () => {
  // Block ads
  removeAds();
  setInterval(removeAds, 1000);
  blockInlineScripts();

  // Block redirects and popups
  blockRedirects();
  blockPopups();
  protectIframes();

  // Safari-specific blocking
  blockSafariSpecific();

  console.log('Enhanced content blockers initialized');
};