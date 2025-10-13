import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
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