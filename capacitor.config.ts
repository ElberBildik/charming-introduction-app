
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.yemekyapp',
  appName: 'YemekyApp',
  webDir: 'dist',
  server: {
    url: 'http://localhost:8080',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: null,
      keystorePassword: null,
      keystoreAlias: null,
      keystoreAliasPassword: null,
    }
  }
};

export default config;
