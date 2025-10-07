import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { AddItemPopup } from './components/add-item-popup/add-item-popup';
import { ListItems } from './components/list-items/list-items';

interface ValueData {
info: string;
  value: number;
  isPaid: boolean;
  date: Date;
  type: 'toPay' | 'toReceive';
}

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    FormsModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    AddItemPopup,
    ListItems,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App {
  protected readonly title = signal('Payment-Review');

  showPopUp: boolean = false;
  itemsToPay: ValueData[] = [];
  itemsToReceive: ValueData[] = [];

  showPopup() {
    this.showPopUp = true;
  }

  closePopup() {
    this.showPopUp = false;
  }

  addItemToList(item: ValueData){
    if (item.type == 'toPay') {
      this.itemsToPay.push(item);
    }
    if (item.type == 'toReceive') {
      this.itemsToReceive.push(item);
    }
  }
}
