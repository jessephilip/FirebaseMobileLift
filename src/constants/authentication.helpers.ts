import FireBase from 'react-native-firebase';
import { User } from './interfaces';

export function signOut () {
  return FireBase.auth().signOut();
}

export function isLoggedIn () {
  return FireBase.auth().authenticated;
}

export function signInAnonymously (): Promise<User> {
  return FireBase.auth().signInAnonymously();
}

export function createUserWithEmailAndPassword (email: string, password: string): Promise<User> {
  return FireBase.auth().createUserWithEmailAndPassword(email, password);
}

export function signInWithEmailAndPassword (email: string, password: string): Promise<User> {
  return FireBase.auth().signInWithEmailAndPassword(email, password);
}

export function getUser () {
  return FireBase.auth().currentUser;
}
