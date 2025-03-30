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

@Component({
  selector: 'app-user',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  readonly text = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {
      data: {name: this.name(), text: this.text()},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.text.set(result);
      }
    });
  }
  
  // openDialog() {
  //   const dialogRef = this.dialog.open(DialogAddUserComponent, {
  //     data: {name: this.name(), text: this.text()});

  //     dialogRef.afterClosed().subscribe(result => {
  //       console.log('The dialog was closed');
  //       if (result !== undefined) {
  //         this.text.set(result);
  //       }
  //     });
  // }
  
}
