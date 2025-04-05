import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../models/user.class';
import { FirebaseService } from '../services/firebase.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-add-user',
  providers: [provideNativeDateAdapter()],
  imports: [[
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatIconModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule,
    CommonModule
  ]],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  readonly dialogRef = inject(MatDialogRef<DialogAddUserComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly text = model(this.data.text);
  birthDate: Date = new Date();

  user = new User();

  // constructor(public firebase: FirebaseService) { }
  firestore = inject(FirebaseService);

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveUser() {
    this.firestore.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current User: ', this.user);
    this.firestore.addUser(this.user.toJSON());
    this.dialogRef.close();
  }
}
