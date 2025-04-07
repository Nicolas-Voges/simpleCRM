import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, addDoc, onSnapshot, Unsubscribe, updateDoc } from '@angular/fire/firestore';
import { User } from '../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnDestroy {
  firestore = inject(Firestore);
  itemCollection = collection(this.firestore, 'users');
  item$ = collectionData(this.itemCollection);
  loading = false;
  users: User[] = [];
  public user: User | undefined;
  unsubUsers;
  unsubUser: Unsubscribe | undefined;

  constructor() {
    this.unsubUsers = onSnapshot(this.getUsersRef(), (list) => {
      this.users = [];
      list.forEach((doc) => {
        this.convertToUser(doc.data(), doc.id);
      });
      console.log(this.users);

    });
  }

  getUser(id: string) {
    this.unsubUser = onSnapshot(this.getDocRef('users', id), (doc) => {
      this.user = new User(doc.data(), doc.id);
    });
  }

  convertToUser(obj: {}, id: string) {
    let user = new User(obj, id);
    this.users.push(user);
  }

  async addUser(user: {}) {
    await addDoc(this.getUsersRef(), user).catch(
      (err) => {
        console.error(err);
        this.loading = false;
      }
    ).then(
      (docRef) => {
        this.loading = false;
      }
    );
  }

  async updateUser(user: User) {
    if (user.id) {
      await updateDoc(this.getDocRef('users', user.id), user.toJSON());
    }
    this.loading = false;
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  getChannelsRef() {
    return collection(this.firestore, 'channels');
  }

  getDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  ngOnDestroy(): void {
    this.unsubUsers();
  }
}
