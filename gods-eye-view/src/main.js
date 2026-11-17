import { createStandaloneApplication } from './standalone/application.js';
import { describeError } from './standalone/errors.js';

const application = createStandaloneApplication({
  googleApiKey: import.meta.env.GOOGLE_MAPS_API_KEY,
  cesiumToken: import.meta.env.CESIUM_ION_TOKEN,
  allowQaRegistration: import.meta.env.DEV,
});

const parentOrigin = (() => {
  try {
    const origin = new URL(document.referrer).origin;
    return ['http://localhost:5173', 'http://127.0.0.1:5173'].includes(origin)
      ? origin
      : null;
  } catch {
    return null;
  }
})();

application
  .start()
  .then(() => {
    if (parentOrigin && window.parent !== window) {
      window.parent.postMessage({ type: 'live-view:ready' }, parentOrigin);
    }
  })
  .catch((error) => {
    console.error('Live View initialization failed:', error);
    const loaderStatus = document.querySelector(
      '#loading-screen .loader-status',
    );
    loaderStatus.textContent = `Error: ${describeError(error)}`;
    loaderStatus.style.color = '#e47868';
    if (parentOrigin && window.parent !== window) {
      window.parent.postMessage(
        { type: 'live-view:error', message: 'Live View could not initialize.' },
        parentOrigin,
      );
    }
  });

export { application };
