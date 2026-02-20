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

        <!-- Mobile Menu Toggle -->
        <button 
          (click)="toggleMenu()" 
          class="lg:hidden p-2 transition-colors hover:text-luxury-gold"
          [ngClass]="{'text-luxury-black': isScrolled, 'text-white': !isScrolled}">
          <svg *ngIf="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg *ngIf="isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Desktop Navigation Icons -->
        <nav class="hidden lg:flex items-center gap-10">
          <a routerLink="/watches" 
             class="text-xs font-bold uppercase tracking-[0.2em] transition-all hover:text-luxury-gold hover:tracking-[0.3em]"
             [ngClass]="{'text-luxury-black': isScrolled, 'text-white': !isScrolled}">
            Collection
          </a>

          <!-- Cart Icon -->
          <a routerLink="/cart" class="relative group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-transform duration-300 group-hover:scale-110 group-hover:text-luxury-gold" 
                 [ngClass]="{'text-luxury-black': isScrolled, 'text-white': !isScrolled}"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span *ngIf="cartItemCount > 0" 
                  class="absolute -top-2 -right-2 bg-luxury-gold text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-pulse">
              {{ cartItemCount }}
            </span>
          </a>

          <!-- User Icon / Auth -->
          <div class="relative group">
            <ng-container *ngIf="authService.isAuthenticated(); else loginBtn">
              <button class="focus:outline-none flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-colors hover:text-luxury-gold" 
                     [ngClass]="{'text-luxury-black': isScrolled, 'text-white': !isScrolled}"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="text-[10px] uppercase tracking-widest font-bold" [ngClass]="{'text-luxury-black': isScrolled, 'text-white': !isScrolled}">Compte</span>
              </button>
              
              <!-- Dropdown -->
              <div class="absolute right-0 mt-2 w-56 bg-white shadow-2xl rounded-sm py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right translate-y-2 group-hover:translate-y-0 z-50 border-t-2 border-luxury-gold">
                <div class="px-6 py-2 border-b border-gray-100 mb-2">
                  <p class="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Bienvenue</p>
                  <p class="text-sm font-serif font-bold text-luxury-black truncate">{{ (authService.currentUser$ | async)?.username }}</p>
                </div>
                <a routerLink="/orders" class="block px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 hover:text-luxury-gold transition-colors">Mes Commandes</a>
                <a routerLink="/profile" class="block px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 hover:text-luxury-gold transition-colors">Profil</a>
                <div class="border-t border-gray-50 my-2"></div>
                <button (click)="logout()" class="block w-full text-left px-6 py-3 text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors">Déconnexion</button>
              </div>
            </ng-container>

            <ng-template #loginBtn>
              <a routerLink="/login" 
                 class="text-xs font-bold uppercase tracking-[0.2em] transition-all hover:text-luxury-gold hover:tracking-[0.3em]"
                 [ngClass]="{'text-luxury-black': isScrolled, 'text-white': !isScrolled}">
                Connexion
              </a>
            </ng-template>
          </div>
        </nav>
      </div>

      <!-- Mobile Sliding Menu -->
      <div 
        class="lg:hidden fixed inset-0 z-40 bg-luxury-black/95 backdrop-blur-md transition-all duration-500 transform"
        [ngClass]="isMenuOpen ? 'translate-x-0' : 'translate-x-full'">
        
        <div class="flex flex-col h-full justify-center items-center gap-8 p-12">
          <a routerLink="/" (click)="closeMenu()" class="text-3xl font-serif font-bold text-white tracking-[0.3em] uppercase mb-12">E-TimesHouse</a>
          
          <a routerLink="/watches" (click)="closeMenu()" class="text-xl font-bold uppercase tracking-[0.4em] text-white hover:text-luxury-gold transition-colors">Collection</a>
          <a routerLink="/cart" (click)="closeMenu()" class="text-xl font-bold uppercase tracking-[0.4em] text-white hover:text-luxury-gold transition-colors">Panier ({{ cartItemCount }})</a>
          
          <div class="w-12 h-px bg-luxury-gold/30 my-4"></div>

          <ng-container *ngIf="authService.isAuthenticated(); else mobileLogin">
            <a routerLink="/orders" (click)="closeMenu()" class="text-xl font-bold uppercase tracking-[0.4em] text-white hover:text-luxury-gold transition-colors">Mes Commandes</a>
            <a (click)="logout(); closeMenu()" class="text-xl font-bold uppercase tracking-[0.4em] text-red-400 hover:text-red-300 transition-colors cursor-pointer">Déconnexion</a>
          </ng-container>
          
          <ng-template #mobileLogin>
            <a routerLink="/login" (click)="closeMenu()" class="text-xl font-bold uppercase tracking-[0.4em] text-white hover:text-luxury-gold transition-colors">Connexion</a>
            <a routerLink="/register" (click)="closeMenu()" class="text-xl font-bold uppercase tracking-[0.4em] text-luxury-gold hover:text-white transition-colors">Inscription</a>
          </ng-template>
        </div>
      </div>
    </header>
  `,
  styles: []
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isMenuOpen = false;
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

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    document.body.style.overflow = 'auto';
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
