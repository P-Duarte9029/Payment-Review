import { HttpClient } from '@angular/common/http';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
hide():boolean {
throw new Error('Method not implemented.');
}
clickEvent($event: PointerEvent) {
throw new Error('Method not implemented.');
}
  username = '';
  password = '';

  http = inject(HttpClient);
  router = inject(Router);

  login() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe((users) => {
      const user = users.find((u) => u.username === this.username && u.password === this.password);
      if (user) {
        alert('Login realizado com sucesso!');
        this.router.navigate(['/dashboard']); // Redireciona para o Dashboard
      } else {
        alert('Credenciais inválidas.');
      }
    });
  }
}