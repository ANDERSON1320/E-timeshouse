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
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>Connexion</h1>
          <p class="subtitle">Accédez à votre espace TimesHouse</p>
        </div>
        
        <form (ngSubmit)="login()" class="auth-form">
          <div class="form-group">
            <label for="username">Nom d'utilisateur</label>
            <div class="input-wrapper">
              <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input 
                id="username"
                type="text" 
                [(ngModel)]="request.username" 
                name="username" 
                placeholder="Votre identifiant"
                required
                autocomplete="username">
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <div class="input-wrapper">
              <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input 
                id="password"
                type="password" 
                [(ngModel)]="request.password" 
                name="password" 
                placeholder="Votre code secret"
                required
                autocomplete="current-password">
            </div>
          </div>

          <div *ngIf="error" class="error-message">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ error }}
          </div>
          
          <button type="submit" class="btn-submit" [disabled]="loading">
            <span *ngIf="!loading">Se Connecter</span>
            <span *ngIf="loading" class="flex items-center justify-center gap-2">
              <span class="spinner"></span>
              Chargement...
            </span>
          </button>
        </form>

        <div class="demo-info">
          <p class="demo-title">Comptes Démo</p>
          <div class="demo-grid">
            <div class="demo-item"><span>Admin:</span> <code>admin / admin123</code></div>
            <div class="demo-item"><span>User:</span> <code>johndoe / user123</code></div>
          </div>
        </div>

        <div class="auth-footer">
          <p>Pas encore membre ? <a routerLink="/register" class="link-gold">Créer un compte</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: calc(100vh - 80px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: radial-gradient(circle at top right, rgba(212, 175, 55, 0.05), transparent),
                  radial-gradient(circle at bottom left, rgba(10, 25, 41, 0.02), transparent);
    }

    .auth-card {
      width: 100%;
      max-width: 450px;
      padding: 3rem;
      background: white;
      border-radius: 4px;
      box-shadow: 0 30px 60px -12px rgba(0,0,0,0.1), 0 18px 36px -18px rgba(0,0,0,0.05);
      border-top: 4px solid var(--color-secondary);
      animation: fadeIn 0.8s ease-out;
    }

    .auth-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .auth-header h1 {
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem;
      color: var(--color-primary);
      margin-bottom: 0.5rem;
      letter-spacing: -0.02em;
    }

    .subtitle {
      color: var(--color-text-secondary);
      font-size: 0.9rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group label {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--color-primary);
    }

    .input-wrapper {
      position: relative;
    }

    .input-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1.25rem;
      height: 1.25rem;
      color: var(--color-text-secondary);
      opacity: 0.5;
    }

    .input-wrapper input {
      width: 100%;
      padding: 1rem 1rem 1rem 3rem;
      border: 1px solid #e5e7eb;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 0.95rem;
      transition: all 0.3s ease;
    }

    .input-wrapper input:focus {
      outline: none;
      border-color: var(--color-secondary);
      box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.1);
    }

    .btn-submit {
      margin-top: 1rem;
      padding: 1.25rem;
      background: var(--color-primary);
      color: white;
      border: none;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-submit:hover:not(:disabled) {
      background: #1a2f42;
      transform: translateY(-2px);
      box-shadow: 0 10px 20px -5px rgba(10, 25, 41, 0.3);
    }

    .btn-submit:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .error-message {
      padding: 1rem;
      background: #fef2f2;
      border-left: 3px solid #ef4444;
      color: #991b1b;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .demo-info {
      margin-top: 2.5rem;
      padding: 1.5rem;
      background: #f9fafb;
      border: 1px dashed #d1d5db;
    }

    .demo-title {
      font-size: 0.7rem;
      font-weight: 800;
      text-transform: uppercase;
      color: #9ca3af;
      margin-bottom: 0.75rem;
      letter-spacing: 0.1em;
    }

    .demo-grid {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .demo-item {
      font-size: 0.8rem;
      color: var(--color-text-secondary);
    }

    .demo-item code {
      background: #f3f4f6;
      padding: 0.1rem 0.4rem;
      border-radius: 2px;
      color: var(--color-primary);
      font-weight: 600;
    }

    .auth-footer {
      margin-top: 2rem;
      text-align: center;
      font-size: 0.9rem;
      color: var(--color-text-secondary);
    }

    .link-gold {
      color: var(--color-secondary);
      font-weight: 700;
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: all 0.3s ease;
    }

    .link-gold:hover {
      border-bottom-color: var(--color-secondary);
    }

    .spinner {
      width: 1rem;
      height: 1rem;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 480px) {
      .auth-card {
        padding: 2rem;
      }
    }
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
