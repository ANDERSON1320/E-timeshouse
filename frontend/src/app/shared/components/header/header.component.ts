import { Component, OnInit, HostListener } from '@angular/core';
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
    <header 
      class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      [ngClass]="{'bg-white/95 backdrop-blur-sm shadow-md py-4': isScrolled, 'bg-transparent py-6': !isScrolled}">
      
      <div class="container mx-auto px-6 h-full flex justify-between items-center">
        <!-- Logo -->
        <a routerLink="/" class="text-2xl font-serif font-bold tracking-widest uppercase"
           [ngClass]="{'text-luxury-black': isScrolled, 'text-white': !isScrolled}">
          E-TimesHouse
        </a>

        <!-- Navigation Icons -->
        <nav class="flex items-center gap-8">
          <a routerLink="/watches" 
             class="text-sm font-medium uppercase tracking-widest transition-colors hover:text-luxury-gold"
             [ngClass]="{'text-luxury-black': isScrolled, 'text-white': !isScrolled}">
            Montres
          </a>

          <!-- Cart Icon -->
          <a routerLink="/cart" class="relative group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-colors group-hover:text-luxury-gold" 
                 [ngClass]="{'text-luxury-black': isScrolled, 'text-white': !isScrolled}"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span *ngIf="cartItemCount > 0" 
                  class="absolute -top-2 -right-2 bg-luxury-gold text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
              {{ cartItemCount }}
            </span>
          </a>

          <!-- User Icon / Auth -->
          <div class="relative group">
            <ng-container *ngIf="authService.isAuthenticated(); else loginBtn">
              <button class="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-colors hover:text-luxury-gold" 
                     [ngClass]="{'text-luxury-black': isScrolled, 'text-white': !isScrolled}"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              
              <!-- Dropdown -->
              <div class="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-sm py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right z-50">
                <a routerLink="/orders" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-luxury-gold">Mes Commandes</a>
                <div class="border-t border-gray-100 my-1"></div>
                <button (click)="logout()" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-luxury-gold">Déconnexion</button>
              </div>
            </ng-container>

            <ng-template #loginBtn>
              <a routerLink="/login" 
                 class="text-sm font-medium uppercase tracking-widest transition-colors hover:text-luxury-gold"
                 [ngClass]="{'text-luxury-black': isScrolled, 'text-white': !isScrolled}">
                Connexion
              </a>
            </ng-template>
          </div>
        </nav>
      </div>
    </header>
  `,
  styles: []
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  cartItemCount = 0;
  cartItems: CartItem[] = [];
  protected readonly environment = environment;

  constructor(
    public authService: AuthService,
    private http: HttpClient
  ) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

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
