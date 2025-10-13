import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
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
  id?: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [
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
  currentItemToEdit: ValueData | null = null;

  openPopUpToAdd(): void{
    this.currentItemToEdit = null;
    this.showPopUp = true;
  }

  openPopUpToEdit(item: ValueData): void{
    this.currentItemToEdit = item;
    this.showPopUp = true;
  }

  closePopUp(): void {
    this.showPopUp = false;
    this.currentItemToEdit = null;
  }

  handleSave(item: ValueData): void{
    if(item.id){
      const index = this.items.findIndex(i => i.id === item.id);
      if(index !== -1){
        this.items[index] = item;
      }
    }
    else{
      item.id = new Date().getTime().toString();
      this.items.push(item);
    }

    this.closePopUp();
  }
}
