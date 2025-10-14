import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface ValueData {
  info: string;
  value: number;
  isPaid: boolean;
  date: Date;
  type: 'toPay' | 'toReceive';
  id?: string;
}

@Injectable({
  providedIn: 'root'
})

export class Expenses {
private apiUrl= 'http://localhost:3000/expenses';
constructor(private http: HttpClient){}

async create(item: ValueData ): Promise<any>{
  return await this.http.post<ValueData>(this.apiUrl, item).toPromise();
}

async update(item: ValueData): Promise<any> {
  return await this.http.put<ValueData>(`${this.apiUrl}/${item.id}`, item).toPromise();
}

async delete(id: string): Promise<any> {
  return await this.http.delete<void>(`${this.apiUrl}/${id}`).toPromise();
}

async list(): Promise<any>{
  return await this.http.get<ValueData[]>(this.apiUrl).toPromise()
}
}
