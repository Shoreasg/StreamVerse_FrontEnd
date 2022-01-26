const CracoLessPlugin = require('craco-less-fix');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
                '@primary-color': '#6441a5',
                '@heading-color': '#262626',
                '@layout-header-background': '#b9a3e3',
                '@layout-body-background': '#b9a3e3',
                '@layout-footer-background': '#FFFFFF',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};