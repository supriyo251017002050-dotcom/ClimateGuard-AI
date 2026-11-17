import { startLiveHazardCctv, stopLiveHazardCctv } from './hazardCctvFeeds.js';

export function _clearCctvFrame() {
  this._cctvFrameRequestToken += 1;
  stopLiveHazardCctv();

  if (this._cctvFramePreloader) {
    this._cctvFramePreloader.onload = null;
    this._cctvFramePreloader.onerror = null;
  }
  this._cctvFramePreloader = null;
  if (this._cctvFrame) {
    this._cctvFrame.classList.remove('active');
    this._cctvFrame.removeAttribute('src');
    this._cctvFrame.dataset.cameraId = '';
    this._cctvFrame.dataset.currentSrc = '';
    this._cctvFrame.dataset.loading = '';
    this._cctvFrame.dataset.error = '';
  }
  this._cctvFrameWrap?.classList.remove('loading', 'has-frame');
  const liveCanvas = this._cctvFrameWrap?.querySelector('#cctv-live-canvas');
  if (liveCanvas) liveCanvas.remove();
}

export function _queueCctvFrame(src, cameraId, cameraChanged) {
  if (this.destroyed || !this._cctvFrame || !cameraId) return;

  const token = ++this._cctvFrameRequestToken;
  this._cctvFrame.dataset.cameraId = cameraId;
  this._cctvFrame.dataset.currentSrc = src || '';
  this._cctvFrame.dataset.loading = '';
  this._cctvFrame.dataset.error = '';

  // Start real-time simulated hazard video stream
  if (this._cctvFrameWrap) {
    this._cctvFrameWrap.classList.remove('loading');
    this._cctvFrameWrap.classList.add('has-frame');
    startLiveHazardCctv(this._cctvFrameWrap, cameraId);
  }

  this._cctvFrame.classList.add('active');
  this._syncCctvSourceBadge(this._cctvState?.activeCamera, true);

  // Still attempt preloading if an external src was supplied
  if (src && /^https?:\/\//i.test(src)) {
    const preloader = new Image();
    this._cctvFramePreloader = preloader;
    preloader.onload = () => {
      if (token === this._cctvFrameRequestToken) {
        this._cctvFrame.src = src;
      }
    };
    preloader.src = src;
  }
}

export function _settleCctvFrame(token, src, ok) {
  if (
    this.destroyed ||
    !this._cctvFrame ||
    token !== this._cctvFrameRequestToken
  )
    return;
  this._cctvFrame.dataset.loading = '';
  this._cctvFrameWrap?.classList.remove('loading');
  this._cctvFrameWrap?.classList.add('has-frame');
  this._cctvFrame.dataset.error = '';
  this._syncCctvSourceBadge(
    this._cctvState?.activeCamera,
    !!this._cctvState?.enabled && !!this.actions.isEnabled(),
  );
}

export function _syncCctvSourceBadge(activeCamera, enabled) {
  if (!this._cctvSourceBadge) return;
  if (!enabled || !activeCamera) {
    this._cctvSourceBadge.textContent = 'CCTV · STANDBY';
    this._cctvSourceBadge.dataset.frameState = 'idle';
    return;
  }
  const city = activeCamera.city || 'Kolkata';
  this._cctvSourceBadge.textContent = `● LIVE BROADCAST · ${city.toUpperCase()}`;
  this._cctvSourceBadge.dataset.frameState = 'ready';
}
