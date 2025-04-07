import { Component, inject, model } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user.class';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-edit-address',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatIconModule,
    MatProgressBarModule,
    CommonModule
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  readonly dialogRef = inject(MatDialogRef<DialogEditAddressComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly text = model(this.data.text);
  firestore = inject(FirebaseService);
  user: User;

  constructor() {
    if (this.firestore.user != undefined) {
      this.user = new User(this.firestore.user.toJSON(), this.firestore.user.id);
    } else {
      this.user = new User();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async saveUser() {
    this.firestore.loading = true;
    await this.firestore.updateUser(this.user);
    this.dialogRef.close();
  }
}
