import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
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
import { ValueData } from '../../interfaces/value-data.interface';
import {MatTooltipModule} from '@angular/material/tooltip';

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
    MatTooltipModule,
  ],
  providers: [
    MatDatepickerModule,
    provideNgxMask(),
    [
      { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
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
  @Input() itens: ValueData[] = [];
  @Output() closePopup = new EventEmitter<boolean>();
  @Output() sendItem = new EventEmitter<ValueData>();

  item: ValueData = this.getEmptyItem();
  title = 'Adicionar Item';
  invalidAreaTxt = false;
  invalidAreaNum = false;
  textExists = false;
  mensageItemExists = "Já existe um item com essa descrição.";

  ngOnInit(): void {
    if (this.itemToEdit) {
      this.item = { ...this.itemToEdit };
      this.title = 'Editando Item';
    } else {
      this.item = this.getEmptyItem();
      this.title = 'Adicionar Item';
    }
  }

  getEmptyItem(): ValueData {
    return {
      info: '',
      value: '' as unknown as number,
      isPaidReceived: false,
      date: new Date(),
      type: 'toPay',
    };
  }

  saveData(): void {
    const num = this.toNumber(this.item.value); 

    if (num <= 0 || isNaN(num)) {
      this.invalidAreaNum = true;
      return;
    }
    if(this.item.info == ''){
      this.invalidAreaTxt = true;
      return;
    }
    
    this.verifyText(this.item.info);
    if(this.textExists){
      this.invalidAreaTxt = true;
      return;
    }

    this.item.value = num;
    this.sendItem.emit({ ...this.item });
    this.close();
  }

  private toNumber(v: any): number {
    return +String(v)
      .replace(/R\$|\s/g, '') // remove "R$" e espaços
      .replace(/\./g, '') // remove separadores de milhar
      .replace(',', '.') // troca vírgula por ponto
      .trim();
  }

  verifyText(txt: string): void {
    const t = txt.trim().toLowerCase();
    this.textExists = this.itens.some(i => i.info.toLowerCase() === t);
  }

  close(): void {
    this.closePopup.emit(false);
  }
}
