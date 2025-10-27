import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { RemoveItemPopup } from '../remove-item-popup/remove-item-popup';
import { Expenses } from '../../services/expenses';
import { MatDateRangePicker } from "@angular/material/datepicker";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSlideToggleModule, MatSlideToggle } from '@angular/material/slide-toggle';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

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
    MatDateRangePicker,
    MatDatepickerModule,
    MatSlideToggle,
    MatSlideToggleModule
],
providers: [
    MatDatepickerModule,
    [
      { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, // Set locale for dd/mm/yyyy
      {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
      },
      { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
  ],
  templateUrl: './list-items.html',
  styleUrl: './list-items.css',
})
export class ListItems {
  [x: string]: any;
  @Input() itens: ValueData[] = [];
  @Input() isToPay = false;
  @Output() openPopup: EventEmitter<boolean> = new EventEmitter(false);
  @Output() editItem = new EventEmitter<ValueData>();
  readonly dialog = inject(MatDialog);
  private expenses = inject(Expenses);
  datePicker: boolean = false; 
  toggleUpArrow: string = "Entrada";
  toggleDownArrow: string = "Saida";

  constructor(expenses: Expenses){}

  ngOnInit(){
    this.itens = this.expenses.getAll();
  }

  onEdit(item: ValueData) {
    this.editItem.emit(item);
  }
  getTotalValue() {
    let totalValue = 0;
    this.itens.forEach((item: ValueData) =>
      item.type == 'toReceive' ? (totalValue += item.value) : (totalValue -= item.value)
    );
    return totalValue;
  }

  deleteItem(item: ValueData): void {
    const index = this.itens.findIndex((i) => i.id === item.id);
    this.itens.splice(index, 1);
    this.expenses.delete(item.id as string);
  }

  openRemoveItemDialog(item: ValueData): void {
    const dialog = this.dialog.open(RemoveItemPopup, {
      width: `300px`,
      panelClass: 'modal-alert',
    });

    dialog
      .afterClosed()
      .subscribe((result) => (result.confirmRemove == true ? this.deleteItem(item) : null));
  }


}
function provideNgxMask(): import("@angular/core").Provider {
  throw new Error('Function not implemented.');
}

