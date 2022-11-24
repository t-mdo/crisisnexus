import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import Mixpanel from 'mixpanel-browser';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

import App from 'pages/App';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://e0dc0fe2372849158c87afce8131219c@o191897.ingest.sentry.io/4504152066555904',
  });
  Mixpanel.init('d0e22b30c642a4319c08f0f8316a0d32', {
    api_host: 'https://api-eu.mixpanel.com',
    debug: true,
  });
}

dayjs.extend(localizedFormat);
dayjs.extend(duration);
dayjs.extend(relativeTime);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
