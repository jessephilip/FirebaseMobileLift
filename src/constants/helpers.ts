import { secrets } from '../../secets';
import firebase from 'react-native-firebase';

export function getCSRF (): string {
  const token = [];
  const num = (): number => Math.floor(Math.random() * (122 - 97) + 97);
  for (let i = 0; i < 33; i++) {
    token.push(String.fromCharCode(num()));
  }
  return token.join('');
}
