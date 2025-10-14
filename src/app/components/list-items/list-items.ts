import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { RemoveItemPopup } from '../remove-item-popup/remove-item-popup';

interface ValueData {
  info: string;
  value: number;
  isPaid: boolean;
  date: Date;
  type: 'toPay' | 'toReceive';
  id?: string;
}

@Component({
  selector: 'app-list-items',
  imports: [
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './list-items.html',
  styleUrl: './list-items.css',
})
export class ListItems {
  [x: string]: any;
  @Input() items: ValueData[] = [];
  @Input() isToPay = false;
  @Output() openPopup: EventEmitter<boolean> = new EventEmitter(false);
  @Output() editItem = new EventEmitter<ValueData>();
  readonly dialog = inject(MatDialog);

  onEdit(item: ValueData) {
    this.editItem.emit(item);
  }
  getTotalValue() {
    let totalValue = 0;
    this.items.forEach((item: ValueData) =>
      item.type == 'toReceive' ? (totalValue += item.value) : (totalValue -= item.value)
    );
    return totalValue;
  }

  deleteItem(item: ValueData): void {
    const index = this.items.findIndex((i) => i.id === item.id);
    this.items.splice(index, 1);
  }

  openRemoveItemDialog(item: ValueData): void {
    const dialog = this.dialog.open(RemoveItemPopup, {
      width: `300px`,
      panelClass: 'modal-alert',
    });

    dialog.afterClosed().subscribe((result) => result.confirmRemove == true ?  this.deleteItem(item) : null);
  }
}
