import {RemixBrowser} from '@remix-run/react';
import {startTransition} from 'react';
import {hydrateRoot} from 'react-dom/client';

import {requestIdleCallback} from './utils/polyfills';

async function hydrate() {
  startTransition(() => {
    hydrateRoot(document, <RemixBrowser />);
  });
}

requestIdleCallback(hydrate);
