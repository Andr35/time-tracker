

// !!! This is a sample on how the
// !!! 'environment.dev.ts' and the 'environment.prod.ts'
// !!! file should be configured.

export const environment = {
  production: false, // Set to true in prod
  sentry_dsn: 'https://abc@sentry.io/123',
  firebase: {
    apiKey: 'a1b2c3',
    authDomain: 'tt.firebaseapp.com',
    databaseURL: 'https://tt.firebaseio.com',
    projectId: 'tt',
    storageBucket: '',
    messagingSenderId: '123'
  }
};
