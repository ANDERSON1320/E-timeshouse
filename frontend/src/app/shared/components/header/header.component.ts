import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';

interface CartItem {
  id: number;
  watchName: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <!-- Logo -->
          <a routerLink="/" class="logo">TimesHouse</a>
          
          <!-- Navigation principale -->
          <nav class="nav-main">
            <!-- Categories Dropdown -->
            <div class="dropdown" (mouseenter)="showCategories = true" (mouseleave)="showCategories = false">
              <a class="nav-link">Catégories ▾</a>
              <div class="dropdown-menu" *ngIf="showCategories">
                <a routerLink="/watches" [queryParams]="{category: 'Homme'}">Montres Homme</a>
                <a routerLink="/watches" [queryParams]="{category: 'Femme'}">Montres Femme</a>
                <div class="dropdown-divider"></div>
                <a routerLink="/watches" [queryParams]="{category: 'Luxe'}">Luxe</a>
                <a routerLink="/watches" [queryParams]="{category: 'Sport'}">Sport</a>
                <a routerLink="/watches" [queryParams]="{category: 'Classique'}">Classique</a>
                <a routerLink="/watches" [queryParams]="{category: 'Connectée'}">Connectée</a>
              </div>
            </div>
            
            <a routerLink="/watches" class="nav-link">Catalogue</a>
          </nav>

          <!-- Actions (Panier + User) -->
          <div class="nav-actions">
            <!-- Cart Icon with Dropdown -->
            <div class="dropdown cart-dropdown" (mouseenter)="showCart = true" (mouseleave)="showCart = false">
              <button class="icon-btn cart-btn">
                🛒
                <span class="badge" *ngIf="cartItemCount > 0">{{ cartItemCount }}</span>
              </button>
              <div class="dropdown-menu cart-menu" *ngIf="showCart">
                <div class="cart-header">
                  <h4>Panier ({{ cartItemCount }})</h4>
                </div>
                <div class="cart-items" *ngIf="cartItemCount > 0; else emptyCart">
                  <div class="cart-item" *ngFor="let item of cartItems">
                    <span class="item-name">{{ item.watchName }}</span>
                    <span class="item-price">{{ item.price | number:'1.0-0' }} {{ environment.currency }}</span>
                  </div>
                  <div class="cart-footer">
                    <a routerLink="/cart" class="btn-view-cart">Voir le panier</a>
                  </div>
                </div>
                <ng-template #emptyCart>
                  <p class="empty-message">Votre panier est vide</p>
                </ng-template>
              </div>
            </div>

            <!-- User Icon with Dropdown -->
            <div class="dropdown user-dropdown" (mouseenter)="showUser = true" (mouseleave)="showUser = false">
              <button class="icon-btn user-btn">👤</button>
              <div class="dropdown-menu user-menu" *ngIf="showUser">
                <ng-container *ngIf="authService.isAuthenticated(); else notAuth">
                  <a routerLink="/profile">Mon Profil</a>
                  <a routerLink="/orders">Mes Commandes</a>
                  <a *ngIf="authService.isAdmin()" routerLink="/admin">Administration</a>
                  <div class="dropdown-divider"></div>
                  <a (click)="logout()" class="logout-link">Déconnexion</a>
                </ng-container>
                <ng-template #notAuth>
                  <a routerLink="/login">Connexion</a>
                  <a routerLink="/register">Inscription</a>
                </ng-template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: var(--color-background);
      color: var(--color-text-primary);
      padding: 15px 0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      border-bottom: 1px solid var(--color-border);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
    }

    .logo {
      font-size: 28px;
      font-weight: bold;
      font-family: 'Playfair Display', serif;
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-decoration: none;
      transition: all var(--transition-base);
      white-space: nowrap;
    }

    .logo:hover {
      transform: scale(1.05);
    }

    .nav-main {
      display: flex;
      gap: 30px;
      align-items: center;
      flex: 1;
    }

    .nav-link {
      color: var(--color-text-primary);
      text-decoration: none;
      padding: 8px 16px;
      border-radius: var(--radius-md);
      transition: all var(--transition-base);
      font-weight: 500;
      cursor: pointer;
      white-space: nowrap;
    }

    .nav-link:hover {
      background-color: var(--color-surface);
      color: var(--color-secondary);
    }

    .nav-actions {
      display: flex;
      gap: 15px;
      align-items: center;
    }

    .icon-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 8px 12px;
      border-radius: var(--radius-md);
      transition: all var(--transition-base);
      position: relative;
    }

    .icon-btn:hover {
      background: var(--color-surface);
      transform: scale(1.1);
    }

    .badge {
      position: absolute;
      top: 2px;
      right: 2px;
      background: var(--color-danger);
      color: white;
      font-size: 10px;
      font-weight: bold;
      padding: 2px 6px;
      border-radius: 10px;
      min-width: 18px;
      text-align: center;
    }

    .dropdown {
      position: relative;
      display: inline-block;
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      background: white;
      min-width: 200px;
      box-shadow: var(--shadow-xl);
      border-radius: var(--radius-md);
      padding: 8px 0;
      z-index: 1000;
      margin-top: 8px;
      animation: fadeIn 0.2s ease-in-out;
    }

    .dropdown-menu a {
      display: block;
      padding: 12px 20px;
      color: var(--color-text-primary);
      text-decoration: none;
      transition: all var(--transition-fast);
      font-weight: 400;
      cursor: pointer;
    }

    .dropdown-menu a:hover {
      background: var(--color-surface);
      color: var(--color-secondary);
      padding-left: 25px;
    }

    .dropdown-divider {
      height: 1px;
      background: var(--color-border);
      margin: 8px 0;
    }

    /* Cart Dropdown */
    .cart-menu {
      right: 0;
      left: auto;
      min-width: 300px;
    }

    .cart-header {
      padding: 12px 20px;
      border-bottom: 1px solid var(--color-border);
    }

    .cart-header h4 {
      margin: 0;
      font-size: 1rem;
      color: var(--color-text-primary);
    }

    .cart-items {
      max-height: 300px;
      overflow-y: auto;
    }

    .cart-item {
      display: flex;
      justify-content: space-between;
      padding: 12px 20px;
      border-bottom: 1px solid var(--color-border);
    }

    .item-name {
      font-size: 0.9rem;
      color: var(--color-text-primary);
    }

    .item-price {
      font-weight: 600;
      color: var(--color-secondary);
    }

    .cart-footer {
      padding: 12px 20px;
    }

    .btn-view-cart {
      display: block;
      text-align: center;
      padding: 10px;
      background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-light) 100%);
      color: var(--color-primary);
      text-decoration: none;
      border-radius: var(--radius-md);
      font-weight: 600;
      transition: all var(--transition-base);
    }

    .btn-view-cart:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-gold);
    }

    .empty-message {
      padding: 20px;
      text-align: center;
      color: var(--color-text-secondary);
    }

    /* User Dropdown */
    .user-menu {
      right: 0;
      left: auto;
    }

    .logout-link {
      color: var(--color-danger) !important;
    }

    @media (max-width: 768px) {
      .header-content {
        gap: 15px;
      }

      .logo {
        font-size: 20px;
      }

      .nav-main {
        gap: 10px;
      }

      .nav-link {
        padding: 6px 10px;
        font-size: 0.9rem;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  showCategories = false;
  showCart = false;
  showUser = false;
  cartItemCount = 0;
  cartItems: CartItem[] = [];
  protected readonly environment = environment;

  constructor(
    public authService: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.loadCartItems();
    }
  }

  loadCartItems(): void {
    this.http.get<any>(`${environment.apiUrl}/cart`).subscribe({
      next: (cart) => {
        this.cartItems = cart.items || [];
        this.cartItemCount = this.cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
      },
      error: () => {
        this.cartItemCount = 0;
        this.cartItems = [];
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.cartItemCount = 0;
    this.cartItems = [];
  }
}
