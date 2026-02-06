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
            <input 
              id="username"
              type="text" 
              [(ngModel)]="request.username" 
              name="username" 
              placeholder="Entrez votre nom d'utilisateur"
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
              placeholder="Entrez votre mot de passe"
              required
              autocomplete="current-password">
          </div>

          <div class="demo-credentials" *ngIf="!loading">
            <p class="demo-title">Comptes de démonstration :</p>
            <div class="demo-accounts">
              <div class="demo-account">
                <strong>Admin:</strong> admin / admin123
              </div>
              <div class="demo-account">
                <strong>Utilisateur:</strong> johndoe / user123
              </div>
            </div>
          </div>
          
          <button type="submit" class="btn-submit" [disabled]="loading">
            <span *ngIf="!loading">Se connecter</span>
            <span *ngIf="loading" class="loading-text">
              <span class="spinner"></span>
              Connexion en cours...
            </span>
          </button>
          
          <div *ngIf="error" class="error-message">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            {{ error }}
          </div>
          
          <div class="divider">
            <span>ou</span>
          </div>
          
          <p class="register-link">
            Pas encore de compte ? 
            <a routerLink="/register" class="link-primary">Inscrivez-vous gratuitement</a>
          </p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: calc(100vh - 200px);
    }

    .auth-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: calc(100vh - 200px);
      padding: 2rem 1rem;
      background: linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%);
    }

    .auth-card {
      width: 100%;
      max-width: 480px;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(20px);
      border-radius: 1.5rem;
      padding: 3rem 2.5rem;
      box-shadow: 
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04),
        0 0 0 1px rgba(255, 255, 255, 0.5) inset;
      border: 1px solid rgba(255, 255, 255, 0.8);
    }

    .auth-header {
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .auth-header h1 {
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #0A1929 0%, #D4AF37 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: #6B7280;
      font-size: 1rem;
      font-weight: 500;
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
      font-weight: 600;
      color: #1F2937;
      font-size: 0.95rem;
    }

    .form-group input {
      padding: 1rem 1.25rem;
      border: 2px solid #E5E7EB;
      border-radius: 0.75rem;
      font-size: 1rem;
      font-family: 'Inter', sans-serif;
      transition: all 250ms ease-in-out;
      background: white;
    }

    .form-group input:focus {
      outline: none;
      border-color: #D4AF37;
      box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.1);
      transform: translateY(-1px);
    }

    .form-group input::placeholder {
      color: #9CA3AF;
    }

    .demo-credentials {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(10, 25, 41, 0.05) 100%);
      border: 1px solid rgba(212, 175, 55, 0.2);
      border-radius: 0.75rem;
      padding: 1rem 1.25rem;
      margin: -0.5rem 0;
    }

    .demo-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: #6B7280;
      margin-bottom: 0.75rem;
    }

    .demo-accounts {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .demo-account {
      font-size: 0.875rem;
      color: #1F2937;
      font-family: 'Courier New', monospace;
      padding: 0.5rem;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 0.375rem;
    }

    .demo-account strong {
      color: #D4AF37;
      font-weight: 700;
    }

    .btn-submit {
      padding: 1.125rem 2rem;
      background: linear-gradient(135deg, #0A1929 0%, #1A2F42 100%);
      color: white;
      border: none;
      border-radius: 0.75rem;
      font-size: 1.05rem;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      cursor: pointer;
      transition: all 300ms ease-in-out;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }

    .btn-submit::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 500ms ease-in-out;
    }

    .btn-submit:hover:not(:disabled)::before {
      left: 100%;
    }

    .btn-submit:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 0 20px rgba(212, 175, 55, 0.3);
    }

    .btn-submit:active:not(:disabled) {
      transform: translateY(0);
    }

    .btn-submit:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .loading-text {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
    }

    .spinner {
      width: 18px;
      height: 18px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .error-message {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 0.75rem;
      color: #DC2626;
      font-size: 0.95rem;
      font-weight: 500;
      animation: slideIn 300ms ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .divider {
      position: relative;
      text-align: center;
      margin: 0.5rem 0;
    }

    .divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: #E5E7EB;
    }

    .divider span {
      position: relative;
      background: rgba(255, 255, 255, 0.98);
      padding: 0 1rem;
      color: #9CA3AF;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .register-link {
      text-align: center;
      color: #6B7280;
      font-size: 0.95rem;
      margin: 0;
    }

    .link-primary {
      color: #D4AF37;
      font-weight: 600;
      text-decoration: none;
      transition: all 200ms ease-in-out;
      position: relative;
    }

    .link-primary::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background: #D4AF37;
      transition: width 300ms ease-in-out;
    }

    .link-primary:hover::after {
      width: 100%;
    }

    .link-primary:hover {
      color: #B8941F;
    }

    @media (max-width: 640px) {
      .auth-card {
        padding: 2rem 1.5rem;
      }

      .auth-header h1 {
        font-size: 2rem;
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
