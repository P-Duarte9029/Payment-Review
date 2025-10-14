import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-item-popup',
  imports: [MatButtonModule, MatDialogContent, MatDialogActions],
  templateUrl: './remove-item-popup.html',
  styleUrl: './remove-item-popup.css'
})
export class RemoveItemPopup {
  readonly dialogRef = inject(MatDialogRef<any>);

  closeRemoveItemDialog(confirmRemove: boolean): void{
    this.dialogRef.close({ confirmRemove });
  }

}
