import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { AddItemPopup } from './../../components/add-item-popup/add-item-popup';
import { ListItems } from './../../components/list-items/list-items';
import { Expenses } from '../../services/expenses';

import { ValueData } from '../../interfaces/value-data.interface';
  

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
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Dashboard implements OnInit {
  protected readonly title = signal('Payment-Review');

  showPopUp: boolean = false;
  itens: ValueData[] = [];
  currentItemToEdit: ValueData | null = null;
  private expenses = inject(Expenses);

  async ngOnInit() {
    this.itens = await this.expenses.list();
  }

  openPopUpToAdd(): void {
    this.currentItemToEdit = null;
    this.showPopUp = true;
  }

  openPopUpToEdit(item: ValueData): void {
    this.currentItemToEdit = item;
    this.showPopUp = true;
  }

  closePopUp(): void {
    this.showPopUp = false;
    this.currentItemToEdit = null;
  }

  async handleSave(item: ValueData): Promise<void> {
    item.date = new Date(item.date);
    if (item.id) {
      const index = this.itens.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        this.itens[index] = item;
        await this.expenses.updateItem(item);
        console.log(item.id, 'updated');
      }
    } else {
      item.id = new Date().getTime().toString();
      // Do not push into `this.itens` directly — `Expenses` keeps the canonical cache.
      // Call create which will add the item to the shared cache and storage.
      await this.expenses.create(item);
      console.log(item.id, 'created');
      // refresh local reference in case it's not the same array instance
      this.itens = await this.expenses.list();
    }

    this.closePopUp();
  }


}
