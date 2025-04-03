import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, addDoc } from '@angular/fire/firestore';
import { User } from '../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore = inject(Firestore);
  itemCollection = collection(this.firestore, 'users');
  item$ = collectionData(this.itemCollection);
  constructor() {
    console.log(this.item$);
  }

  async addUser(user: {}) {
    await addDoc(this.getUsersRef(), user).catch(
      (err) => {console.error(err)
      }
    ).then(
      (docRef) => { console.log('Doc Id: ', docRef);
      }
    );
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  getChannelsRef() {
    return collection(this.firestore, 'channels');
  }

  getDocReft(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
}
