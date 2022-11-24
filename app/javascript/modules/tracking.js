import { useEffect } from 'react';
import Mixpanel from 'mixpanel-browser';

export const identifyUser = ({ id }) => {
  console.log('track', process.env.NODE_ENV);
  if (process.env.NODE_ENV !== 'production') {
    console.log('identified for tracking user', id); // eslint-disable-line no-console
    return;
  }
  Mixpanel.identify(id);
};

export const trackEvent = ({ name, ...payload }) => {
  console.log('track', process.env.NODE_ENV);
  if (process.env.NODE_ENV !== 'production') {
    console.log('event tracked', name, payload); // eslint-disable-line no-console
    return;
  }
  Mixpanel.track(name.toLowerCase(), payload);
};

export const useTrackEvent = (event, { watch = [] } = {}) => {
  useEffect(() => {
    trackEvent(event);
  }, watch);
};

export default trackEvent;
