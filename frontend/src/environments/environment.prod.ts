import {envVariable} from '../config';

export const environment = {
  production: true,
  firebase:{
    apiKey: envVariable.apiKey,
    authDomain: envVariable.authDomain,
    projectId:envVariable.projectId,
    storageBucket: envVariable.storageBucket,
    messagingSenderId: envVariable.messagingSenderId,
    appId: envVariable.appId,
    measurementId:envVariable.measurementId
  }
};
