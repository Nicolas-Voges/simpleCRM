import { Component, inject, model, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  // MAT_DIALOG_DATA,
  MatDialog
  // MatDialogActions,
  // MatDialogClose,
  // MatDialogContent,
  // MatDialogRef,
  // MatDialogTitle,
} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
// import { AsyncPipe } from '@angular/common';
import { FirebaseService } from '../services/firebase.service';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-user',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatCardModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  readonly text = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);
  // public firebase = inject(FirebaseService);

  constructor(public firebase: FirebaseService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {
      data: {name: this.name(), text: this.text()},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.text.set(result);
      }
    });
  }
}
