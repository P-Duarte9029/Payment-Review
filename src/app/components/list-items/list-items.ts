import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

interface ValueData {
  info: string;
  value: number;
  isPaid: boolean;
  date: Date;
  type: 'toPay' | 'toReceive';
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

  getTotalValue() {
    let totalValue = 0;
    this.items.forEach((item: ValueData) => item.type == 'toReceive'? totalValue += item.value : totalValue -= item.value);
    return totalValue;
  }
}
