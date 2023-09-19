import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  name: 'Mitexl',
  description: 'Your Personal Mitacs Project Wishlist',
  version: '1.1.0',
  manifest_version: 3,
  icons: {
    '16': 'img/favicon-16.png',
    '32': 'img/favicon-32.png',
    '48': 'img/favicon-48.png',
    '128': 'img/favicon-128.png',
  },
  action: {
    // default_popup: 'popup.html',
    default_icon: 'img/favicon-48.png',
  },
  options_page: 'options.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches:  ['*://globalink.mitacs.ca/*'],
      js: ['src/content/index.ts'],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['img/logo-16.png', 'img/logo-34.png', 'img/logo-48.png', 'img/logo-128.png'],
      matches: [],
    },
  ],
  permissions: ["storage", "tabs"],
  key: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArDKvlQlb1ZFuiBj8LunPq1N1kPS4HTeUmLcVYz1QHDzCdacVMJKEcFAj+JDhsXcNbc4wd1lQI6e1EFAXivLWk2OjpXohOzq9X4dNldfks8meE5eSoejOeJrUD0+i9yB3J2Ry5JNRhkuA3A6NEmIte71JgzF4PhaoFi/aACdrMHChdckVyx+phIN5YaWHDpIntkDZGqG+UqSSgzYhmAMfRMKEpMkW/qrXaZtvAzzxDJ6iOoWESdLT8f681cXAVeXMHKM2DD2dRbdhYO03R/LukrEOkFsnGh5oIVlLimJ3Gzj6d9z1Rec8TTvq70qobIcVBcYprOlpaJvruSPAfcY/mQIDAQAB"
})

