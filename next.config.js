'use strict';

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  env: {
    CUSTOM_ENV_VARIABLE: process.env.CUSTOM_ENV_VARIABLE,
  },
};

module.exports = nextConfig;
