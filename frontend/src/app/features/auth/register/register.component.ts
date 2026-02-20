import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, RegisterRequest } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>Inscription</h1>
          <p class="subtitle">Rejoignez l'excellence TimesHouse</p>
        </div>
        
        <form (ngSubmit)="register()" class="auth-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">Prénom</label>
              <div class="input-wrapper">
                <input 
                  id="firstName"
                  type="text" 
                  [(ngModel)]="request.firstName" 
                  name="firstName" 
                  placeholder="Jean"
                  required
                  autocomplete="given-name">
              </div>
            </div>
            
            <div class="form-group">
              <label for="lastName">Nom</label>
              <div class="input-wrapper">
                <input 
                  id="lastName"
                  type="text" 
                  [(ngModel)]="request.lastName" 
                  name="lastName" 
                  placeholder="Dupont"
                  required
                  autocomplete="family-name">
              </div>
            </div>
          </div>

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
                placeholder="Choisissez un identifiant"
                required
                autocomplete="username">
            </div>
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <div class="input-wrapper">
              <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input 
                id="email"
                type="email" 
                [(ngModel)]="request.email" 
                name="email" 
                placeholder="votre.email@exemple.com"
                required
                autocomplete="email">
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
                placeholder="6 caractères minimum"
                required
                autocomplete="new-password">
            </div>
          </div>

          <div class="admin-section">
            <div class="admin-toggle" (click)="showAdminCode = !showAdminCode">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" class="text-luxury-gold">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"/>
              </svg>
              <span>Code Administrateur ?</span>
              <svg 
                class="chevron ml-auto transition-transform" 
                [class.rotate-180]="showAdminCode"
                width="18" 
                height="18" 
                viewBox="0 0 20 20" 
                fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </div>
            
            <div class="admin-code-field overflow-hidden transition-all duration-300" [style.max-height]="showAdminCode ? '100px' : '0'">
              <div class="p-4 pt-0">
                <input 
                  id="adminCode"
                  type="text" 
                  [(ngModel)]="adminCode" 
                  name="adminCode" 
                  placeholder="Code optionnel"
                  class="w-full p-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-luxury-gold"
                  autocomplete="off">
              </div>
            </div>
          </div>
          
          <button type="submit" class="btn-submit" [disabled]="loading">
            <span *ngIf="!loading">Créer mon compte</span>
            <span *ngIf="loading" class="flex items-center justify-center gap-2">
              <span class="spinner"></span>
              Création...
            </span>
          </button>
          
          <div *ngIf="error" class="error-message">
            <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ error }}
          </div>
          
          <div *ngIf="success" class="success-message">
            <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ success }}
          </div>

          <div class="auth-footer">
            <p>Déjà un compte ? <a routerLink="/login" class="link-gold">Se connecter</a></p>
          </div>
        </form>
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
      max-width: 500px;
      padding: 3rem;
      background: white;
      border-radius: 4px;
      box-shadow: 0 30px 60px -12px rgba(0,0,0,0.1), 0 18px 36px -18px rgba(0,0,0,0.05);
      border-top: 4px solid var(--color-secondary);
      animation: fadeIn 0.8s ease-out;
    }

    .auth-header {
      text-align: center;
      margin-bottom: 2.5rem;
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
      font-size: 0.85rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .form-group label {
      font-size: 0.7rem;
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
      width: 1.1rem;
      height: 1.1rem;
      color: var(--color-text-secondary);
      opacity: 0.5;
    }

    .input-wrapper input {
      width: 100%;
      padding: 0.8rem 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 0.9rem;
      transition: all 0.3s ease;
    }

    .input-wrapper input:focus {
      outline: none;
      border-color: var(--color-secondary);
      box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.1);
    }

    .input-wrapper:has(svg) input {
      padding-left: 2.75rem;
    }

    .admin-section {
      background: #fdfaf3;
      border: 1px solid #f3e8d2;
      border-radius: 2px;
    }

    .admin-toggle {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--color-primary);
      user-select: none;
    }

    .btn-submit {
      margin-top: 0.5rem;
      padding: 1.1rem;
      background: var(--color-primary);
      color: white;
      border: none;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.2rem;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
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

    .error-message, .success-message {
      padding: 0.75rem 1rem;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      border-radius: 2px;
    }

    .error-message {
      background: #fef2f2;
      color: #991b1b;
      border-left: 3px solid #ef4444;
    }

    .success-message {
      background: #f0fdf4;
      color: #166534;
      border-left: 3px solid #22c55e;
    }

    .auth-footer {
      margin-top: 1.5rem;
      text-align: center;
      font-size: 0.85rem;
      color: var(--color-text-secondary);
    }

    .link-gold {
      color: var(--color-secondary);
      font-weight: 700;
      text-decoration: none;
    }

    .link-gold:hover {
      text-decoration: underline;
    }

    .spinner {
      width: 0.9rem;
      height: 0.9rem;
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
      .auth-card { padding: 2rem; }
      .form-row { grid-template-columns: 1fr; }
    }
  `]
})
export class RegisterComponent {
  request: RegisterRequest = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };
  adminCode = '';
  showAdminCode = false;
  loading = false;
  error = '';
  success = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  register(): void {
    this.loading = true;
    this.error = '';
    this.success = '';

    const registerRequest: RegisterRequest = {
      ...this.request,
      adminCode: this.adminCode.trim() || undefined
    };

    this.authService.register(registerRequest).subscribe({
      next: () => {
        this.success = 'Compte créé avec succès ! Redirection...';
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (err) => {
        this.error = err.error?.message || 'Erreur lors de l\'inscription. Veuillez réessayer.';
        this.loading = false;
      }
    });
  }
}
