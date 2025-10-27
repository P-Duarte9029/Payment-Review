import { Injectable } from '@angular/core';

interface ValueData {
  info: string;
  value: number;
  isPaid: boolean;
  date: Date;
  type: 'toPay' | 'toReceive';
  id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Expenses {
  private storageKey = 'expenses';

  private apiUrl = 'http://localhost:3000/expenses';
  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  // synchronous helpers (used internally)
  getAll(): ValueData[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  getById(id: string): ValueData | undefined {
    return this.getAll().find(item => item.id === id);
  }

  add(item: ValueData): void {
    const itens = this.getAll();
    itens.push(item);
    localStorage.setItem(this.storageKey, JSON.stringify(itens));
  }

  update(updateItem: ValueData): void {
    const itens = this.getAll().map(item => item.id === updateItem.id ? updateItem : item);
    localStorage.setItem(this.storageKey, JSON.stringify(itens));
  }

  delete(id: string): void{
    const itens = this.getAll().filter(item => item.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(itens));
  }

  

  async list(): Promise<ValueData[]> {
    return Promise.resolve(this.getAll());
  }

  async create(item: ValueData): Promise<ValueData> {
    this.add(item);
    return Promise.resolve(item);
  }

  async updateItem(item: ValueData): Promise<ValueData> {
    this.update(item);
    return Promise.resolve(item);
  }

  async remove(id: string): Promise<void> {
    this.delete(id);
    return Promise.resolve();
  }


}
