/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  appDirectory: 'src',
  cacheDirectory: './node_modules/.cache/remix',
  future: {
    v2_errorBoundary: true,
    v2_headers: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
    v2_dev: true,
  },
  ignoredRouteFiles: ['*.module.css'],
  publicPath: '/build/',
  serverModuleFormat: 'esm',
};
