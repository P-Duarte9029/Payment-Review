import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header
],
  template: `<app-header />  <router-outlet />`
})
export class App {
 
}
