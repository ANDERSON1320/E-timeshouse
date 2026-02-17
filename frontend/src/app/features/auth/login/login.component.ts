import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, LoginRequest } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container" style="max-width: 400px; margin-top: 4rem;">
      <h1 class="text-center">Connexion</h1>
      
      <div class="card">
        <form (ngSubmit)="login()">
          <div class="form-group">
            <label for="username">Nom d'utilisateur</label>
            <input 
              id="username"
              type="text" 
              [(ngModel)]="request.username" 
              name="username" 
              required
              autocomplete="username">
          </div>
          
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input 
              id="password"
              type="password" 
              [(ngModel)]="request.password" 
              name="password" 
              required
              autocomplete="current-password">
          </div>

          <div *ngIf="error" class="error-message">
            {{ error }}
          </div>
          
          <button type="submit" class="btn btn-primary full-width" [disabled]="loading">
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>

        <div class="demo-info">
          <p><strong>Demo:</strong> admin / admin123</p>
          <p><strong>User:</strong> johndoe / user123</p>
        </div>

        <div class="text-center mt-1">
          <a routerLink="/register">Pas de compte ? S'inscrire</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      border: 1px solid var(--border);
      padding: 2rem;
      border-radius: 8px;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    .error-message {
      color: var(--accent);
      background: #ffe6e6;
      padding: 0.5rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }
    .demo-info {
      margin-top: 1.5rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 4px;
      border: 1px solid var(--border);
      font-size: 0.85rem;
    }
    .demo-info p { margin: 0.2rem 0; }
    .full-width { width: 100%; }
    .mt-1 { margin-top: 1rem; }
    .text-center { text-align: center; }
  `]
})
export class LoginComponent {
  request: LoginRequest = { username: '', password: '' };
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login(): void {
    this.loading = true;
    this.error = '';
    this.authService.login(this.request).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = 'Identifiants incorrects. Veuillez réessayer.';
        this.loading = false;
      }
    });
  }
}
