import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import {cssBundleHref} from '@remix-run/css-bundle';
import type {LinksFunction} from '@remix-run/server-runtime';
import './css/reset.css';

export const links: LinksFunction = () => {
  return [...(cssBundleHref ? [{rel: 'stylesheet', href: cssBundleHref}] : [])];
};

export default function Root() {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
