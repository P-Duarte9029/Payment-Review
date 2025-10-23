import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { environment } from '../enviroments/enviroments';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
],
providers:[
],
  template: `<app-header />  <router-outlet />`
})
export class App {
 
}
