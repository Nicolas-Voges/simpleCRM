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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-dialog-edit-user',
  providers: [provideNativeDateAdapter()],
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
    MatDatepickerModule,
    CommonModule
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
  readonly dialogRef = inject(MatDialogRef<DialogEditUserComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly text = model(this.data.text);
  firestore = inject(FirebaseService);
  user: User;
  birthDate: Date;

  constructor() {
    if (this.firestore.user != undefined) {
      this.user = this.firestore.user;
      this.birthDate = new Date(this.firestore.user?.birthDate);
    } else {
      this.user = new User();
      this.birthDate = new Date();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async saveUser() {
    this.firestore.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    await this.firestore.updateUser(this.user);
    this.dialogRef.close();
  }
}
