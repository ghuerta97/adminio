// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api: 'https://adminio-backend.herokuapp.com',
  firebase: {
    apiKey: "AIzaSyCJzZDVH5BLq3S4jq6z_lB4WSrUpyi0k2Y",
    authDomain: "adminio.firebaseapp.com",
    databaseURL: "https://adminio.firebaseio.com",
    projectId: "adminio",
    storageBucket: "adminio.appspot.com",
    messagingSenderId: "490867024093",
    appId: "1:490867024093:web:11e9723c8cafa1ac85bb34",
    measurementId: "G-KEZ98PLV9X"
  }
};
