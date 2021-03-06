// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// NOTE: This is no longer required as we added port 4200 as an allowed origin for cors
// However if we removed 4200 as an allowed origin then we would have to change the below
// apiEndpoint port to be 4200 and then add all the routes with a mapping to 8080 in proxy.conf.json.
// To run with the dev backend use the following command:
// ng serve --proxy-config proxy.conf.json

export const environment = {
  production: false,
  apiEndpoint: 'http://localhost:8080',
  authenticatedRedirect: '/teams',
  logoutRedirect: ''
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
