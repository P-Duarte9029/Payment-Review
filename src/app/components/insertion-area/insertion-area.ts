import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insertion-area',
  imports: [FormsModule, CommonModule],
  templateUrl: './insertion-area.html',
  styleUrl: './insertion-area.css'
})
export class InsertionArea { 
  valor:number = 120.10; 
  valueArray: ValueData[] = [];
  show_pop_up:boolean = false;

  newInfo:string = "";
  newValue:number = 0;

  showP(){
    this.show_pop_up = true;
  }
  closeP(){
    this.show_pop_up = false;
  }

  SaveData(){
    let newItem = new ValueData(this.newInfo, this.newValue);
    this.valueArray.push(newItem);
    this.closeP();
    this.newInfo = "";
    this.newValue = 0;
  }

}

export class ValueData{
     info: string;
     value: number;
     active: boolean;

    constructor(info: string, value: number){
      this.info = info;
      this.value = value;
      this.active = true;
    }
  }