import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Mon profil</h1>
      <div class="profile-form" *ngIf="profile">
        <form (ngSubmit)="updateProfile()">
          <div class="form-group">
            <label>Nom d'utilisateur</label>
            <input type="text" [value]="profile.username" disabled>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" [(ngModel)]="profile.email" name="email" required>
          </div>
          <div class="form-group">
            <label>Prénom</label>
            <input type="text" [(ngModel)]="profile.firstName" name="firstName" required>
          </div>
          <div class="form-group">
            <label>Nom</label>
            <input type="text" [(ngModel)]="profile.lastName" name="lastName" required>
          </div>
          <button type="submit" class="btn-primary" [disabled]="loading">
            {{ loading ? 'Enregistrement...' : 'Enregistrer' }}
          </button>
          <p *ngIf="message" [class]="messageClass">{{ message }}</p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .profile-form {
      max-width: 500px;
      margin: 30px auto;
      background: white;
      padding: 30px;
      border-radius: 8px;
    }
  `]
})
export class ProfileComponent implements OnInit {
  profile: UserProfile | null = null;
  loading = false;
  message = '';
  messageClass = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.http.get<UserProfile>(`${environment.apiUrl}/users/profile`).subscribe(profile => {
      this.profile = profile;
    });
  }

  updateProfile(): void {
    if (this.profile) {
      this.loading = true;
      this.http.put<UserProfile>(`${environment.apiUrl}/users/profile`, this.profile).subscribe({
        next: () => {
          this.message = 'Profil mis à jour avec succès';
          this.messageClass = 'success';
          this.loading = false;
        },
        error: () => {
          this.message = 'Erreur lors de la mise à jour';
          this.messageClass = 'error';
          this.loading = false;
        }
      });
    }
  }
}


