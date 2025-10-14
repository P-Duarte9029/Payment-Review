import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, output, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MatMomentDateModule,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

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
  id?: string;  //para identificar o item a ser editado
}

@Component({
  selector: 'app-add-item-popup',
  imports: [
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    NgxMaskDirective,
  ],
  providers: [
    MatDatepickerModule,
    provideNgxMask(),
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
  templateUrl: './add-item-popup.html',
  styleUrl: './add-item-popup.css',
})
export class AddItemPopup implements OnInit {

  @Input() itemToEdit: ValueData | null = null;
  @Input() showPopUp: boolean = false;
  @Output() closePopup = new EventEmitter<boolean>();
  @Output() sendItem = new EventEmitter<ValueData>();

  item: ValueData = this.getEmptyItem();
  title = 'Adicionar Item';
  
  ngOnInit(): void {
    if(this.itemToEdit){
      this.item = {...this.itemToEdit};
      this.title = 'Editando Item';
    }
    else{
      this.item = this.getEmptyItem();
      this.title = 'Adicionar Item'
    }
  }
  
  getEmptyItem(): ValueData{
    return{
      info: '',
      value: 0,
      isPaid: false,
      date: new Date(),
      type: 'toPay'

    }
  }

  saveData(): void {
    this.sendItem.emit(this.item);
    this.close();

  }

  close(): void {
    this.closePopup.emit();
  }
}
