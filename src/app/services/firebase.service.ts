import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, addDoc, onSnapshot } from '@angular/fire/firestore';
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
  unsubUser;

  constructor() {
    this.unsubUser = onSnapshot(this.getUsersRef(), (list) => {
      this.users = [];
      list.forEach((doc) => {
        this.convertToUser(doc.data(), doc.id);
      });
      console.log(this.users);
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
    this.unsubUser();
  }
}
