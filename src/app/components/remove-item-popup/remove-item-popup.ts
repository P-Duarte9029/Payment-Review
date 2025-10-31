import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-item-popup',
  imports: [MatButtonModule, MatDialogContent, MatDialogActions],
  templateUrl: './remove-item-popup.html',
  styleUrl: './remove-item-popup.css'
})
export class RemoveItemPopup {
  readonly dialogRef = inject(MatDialogRef<any>);

  title_msg: string = "Apagar conta";
  complete_msg: string = "Você quer apagar a conta?";
  resp_esq: string = "Não";
  resp_dir: string = "Sim";

  closeRemoveItemDialog(confirmRemove: boolean): void{
    this.dialogRef.close({ confirmRemove });
  }

}
