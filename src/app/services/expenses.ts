import { Injectable } from '@angular/core';
import { ValueData } from '../interfaces/value-data.interface';

@Injectable({
  providedIn: 'root',
})
export class Expenses {
  private storageKey = 'Payment-Review-save';
  private itensCache: ValueData[] = [];

  constructor() {
    this.itensCache = this.getAllFromStorage();
  }

  private getAllFromStorage(): ValueData[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : []; 
  }

  private saveToStorage(): void{
    localStorage.setItem(this.storageKey, JSON.stringify(this.itensCache))
  }

  // synchronous helpers (used internally)
  getAll(): ValueData[] {
    return this.itensCache;
  }

  getById(id: string): ValueData | undefined {
    return this.getAll().find(item => item.id === id);
  }

  add(item: ValueData): void {
    this.itensCache.push(item);
    this.saveToStorage();
  }

  update(updateItem: ValueData): void {
    this.itensCache = this.itensCache.map(item => item.id === updateItem.id ? updateItem : item);
    this.saveToStorage();
  }

  delete(id: string): void{
    this.itensCache = this.itensCache.filter(item => item.id !== id);
    this.saveToStorage();
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
