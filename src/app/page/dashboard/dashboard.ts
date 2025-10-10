import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { Header } from './../../components/header/header';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { AddItemPopup } from './../../components/add-item-popup/add-item-popup';
import { ListItems } from './../../components/list-items/list-items';

interface ValueData {
info: string;
  value: number;
  isPaid: boolean;
  date: Date;
  type: 'toPay' | 'toReceive';
}

@Component({
  selector: 'app-dashboard',
  imports: [
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
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Dashboard {
  protected readonly title = signal('Payment-Review');

  showPopUp: boolean = false;
  items: ValueData[] = [];

  showPopup() {
    this.showPopUp = true;
  }

  closePopup() {
    this.showPopUp = false;
  }

  addItemToList(item: ValueData) {
    this.items.push(item);
  }
}
