import { Component, inject, OnDestroy, OnInit, model, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../models/user.class';

@Component({
  selector: 'app-user-detail',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit, OnDestroy {
  public firestore = inject(FirebaseService);
  readonly text = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUser();
  }

 getUser() {
    let idTime = setTimeout(() => {
      let id = this.route.snapshot.params['id'];
      this.firestore.getUser(id);
      clearTimeout(idTime);
    }, 200);
  }

  openUserDialog(): void {
    const dialogRef = this.dialog.open(DialogEditUserComponent, {
      data: { name: this.name(), text: this.text() },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.text.set(result);
      }
    });
  }

  openAddressDialog(): void {
    const dialogRef = this.dialog.open(DialogEditAddressComponent, {
      data: { name: this.name(), text: this.text() },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.text.set(result);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.firestore.unsubUser != undefined) {
      this.firestore.unsubUser();
    }
  }
}
