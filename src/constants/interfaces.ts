export interface CollectionReference {
  firestore: Firestore;
  id: string;
  parent: DocumentReference;
  add: (data) => Promise<DocumentReference>;
  doc: (documentPath) => DocumentReference;
  endAt: (snapshotOrVarArgs) => Query;
  endBefore: (snapshotOrVarArgs) => Query;
  get: () => Promise<QuerySnapshot>;
  limit: (limit) => Query;
  onSnapshot: (optionsOrObserverOrOnNext, observerOrOnNextOrOnError, onError, onCompletion) => void;
  orderBy: (fieldPath, directionStr) => Query;
  startAfter: (snapshotOrVarArgs) => Query;
  startAt: (snapshotOrVarArgs) => Query;
  where: (fieldPath, opStr, value) => Query;
}

export interface DocumentChange {
  // don't know yet
}

export interface DocumentReference {
  firestore: Firestore;
  id: string;
  parent: DocumentReference;
  collection: (collectionPath) => CollectionReference;
  delete: () => Promise<void>;
  get: () => Promise<DocumentSnapshot>;
  onSnapshot: (optionsOrObserverOrOnNext, observerOrOnNextOrOnError, onError) => void;
  set: (data, options) => Promise<void>;
  update: (...args) => Promise<void>;
}

export interface DocumentSnapshot {
  exists: boolean;
  id: string;
  ref: DocumentReference;
  data: () => Object;
  get: (fieldPath) => any | undefined;
}

export interface Firestore {
  batch: WriteBatch;
  collection: (collectionPath) => CollectionReference;
  doc: (documentPath) => DocumentReference;
}

export interface Query {
  firestore: Firestore;
  endAt: (snapshotOrVarArgs) => Query;
  endBefore: (snapshotOrVarArgs) => Query;
  get: () => Promise<QuerySnapshot>;
  limit: (limit) => Query;
  onSnapshot: (optionsOrObserverOrOnNext, observerOrOnNextOrOnError, onError, onCompletion) => void;
  orderBy: (fieldPath, directionStr) => Query;
  startAfter: (snapshotOrVarArgs) => Query;
  startAt: (snapshotOrVarArgs) => Query;
  where: (fieldPath, opStr, value) => Query;
}

export interface QuerySnapshot {
  docChanges: DocumentChange[];
  docs: DocumentChange[];
  empty: boolean;
  query: Query;
  size: number;
  forEach: (callback) => void;
}

export interface User {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  photoURL: string | null;
  providerData: UserInfo[];
  providerId: string;
  refreshToken: string;
  uid: string;
  delete: () => Promise<void>;
  getIdToken: (forceRefresh) => Promise<string>;
  linkWithCredential: (credential) => Promise<User>;
  reauthenticateWithCredential: (credential) => Promise<void>;
  reload: () => Promise<void>;
  sendEmailVerification: () => Promise<void>;
  toJSON: () => Object;
  unlink: (providerId) => User;
  updateEmail: (newEmail) => Promise<void>;
  updatePassword: (newPassword) => Promise<void>;
  updateProfile: (profile) => Promise<void>;
}

export interface UserInfo {
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  providerId: string;
  uid: string;
}

export interface WriteBatch {
  commit: () => Promise<void>;
  delete: (documentRef) => WriteBatch;
  set: (documentRef, data, options) => WriteBatch;
  update: (documentRef, ...var_args) => WriteBatch;
}