import { initializeApp, applicationDefault } from 'firebase-admin/app';

initializeApp({
  credential: applicationDefault(),
  projectId: '<FIREBASE_PROJECT_ID>',
});