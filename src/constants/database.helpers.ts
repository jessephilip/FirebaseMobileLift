import { CollectionReference, DocumentReference } from './interfaces';
import FireBase from 'react-native-firebase';

const firestore = FireBase.firestore();

export function createDocument (collectionName: string, data) {
  return firestore.collection(collectionName).add(data);
}

export function createUserDocument (data: Object): Promise<DocumentReference> {
  const usersRef: CollectionReference = firestore.collection('users');
  return usersRef.add(data);
}
