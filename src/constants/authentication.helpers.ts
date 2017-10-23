import FireBase from 'react-native-firebase';

export function signOut () {
  return FireBase.auth().signOut();
}

export function isLoggedIn () {
  return FireBase.auth().authenticated;
}

export function signInAnonymously () {
  return FireBase.auth().signInAnonymously();
}

export function createUserWithEmailAndPassword (email: string, password: string) {
  return FireBase.auth().createUserWithEmailAndPassword(email, password);
}

export function signInWithEmailAndPassword (email: string, password: string) {
  return FireBase.auth().signInWithEmailAndPassword(email, password);
}
