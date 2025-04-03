import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { api_key } from './api_key.json';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "simplecrm-f4c9e", appId: "1:964669480162:web:ac875e17187b03324dd2bb", storageBucket: "simplecrm-f4c9e.firebasestorage.app", apiKey: api_key, authDomain: "simplecrm-f4c9e.firebaseapp.com", messagingSenderId: "964669480162" })), provideFirestore(() => getFirestore())]
};
