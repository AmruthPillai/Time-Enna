const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = withPWA({
  pwa: {
    disable: !isProduction,
    dest: 'public',
    runtimeCaching
  }
});
