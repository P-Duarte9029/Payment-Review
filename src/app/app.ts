import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InsertionArea } from './components/insertion-area/insertion-area';
import { Header } from './components/header/header';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InsertionArea, Header, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Payment-Review');
}