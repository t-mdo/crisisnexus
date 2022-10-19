import React from 'react';
import ReactDOM from 'react-dom/client';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

import App from 'pages/App';

dayjs.extend(localizedFormat);
dayjs.extend(duration);
dayjs.extend(relativeTime);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
