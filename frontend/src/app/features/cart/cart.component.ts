import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, Cart, CartItem } from '../../core/services/cart.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container" style="max-width: 800px; margin-top: 2rem;">
      <h1>Mon Panier</h1>
      
      <div *ngIf="cart && cart.items.length > 0; else emptyCart" class="cart-container">
        <div class="cart-items">
          <div *ngFor="let item of cart.items" class="cart-item">
            <div class="item-info">
              <h3>{{ item.watchName }}</h3>
              <p class="brand">{{ item.watchBrand }}</p>
              <p class="price">{{ item.watchPrice | number:'1.0-0' }} {{ environment.currency }}</p>
            </div>
            
            <div class="item-actions">
              <div class="quantity-controls">
                <button (click)="updateQuantity(item.id, item.quantity - 1)" class="btn-qty">-</button>
                <span>{{ item.quantity }}</span>
                <button (click)="updateQuantity(item.id, item.quantity + 1)" class="btn-qty">+</button>
              </div>
              <p class="subtotal">{{ item.subtotal | number:'1.0-0' }} {{ environment.currency }}</p>
              <button (click)="removeItem(item.id)" class="btn-remove">×</button>
            </div>
          </div>
        </div>

        <div class="cart-summary">
          <div class="summary-row">
            <span>Total articles:</span>
            <span>{{ cart.totalItems }}</span>
          </div>
          <div class="summary-row total-row">
            <span>Total:</span>
            <span>{{ cart.totalAmount | number:'1.0-0' }} {{ environment.currency }}</span>
          </div>
          <a routerLink="/checkout" class="btn btn-primary full-width">Passer la commande</a>
        </div>
      </div>

      <ng-template #emptyCart>
        <div class="text-center empty-state">
          <p>Votre panier est vide.</p>
          <a routerLink="/watches" class="btn btn-primary">Découvrir nos montres</a>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    h1 { margin-bottom: 2rem; }
    
    .cart-container {
      display: grid;
      gap: 2rem;
    }

    .cart-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border: 1px solid var(--border);
      border-radius: 8px;
      margin-bottom: 1rem;
      background: white;
    }

    .item-info h3 { margin: 0 0 0.5rem 0; font-size: 1.1rem; }
    .brand { color: var(--secondary); font-size: 0.9rem; margin: 0; }
    .price { font-weight: bold; margin-top: 0.5rem; }

    .item-actions {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 0.2rem;
    }

    .btn-qty {
      background: none;
      border: none;
      width: 25px;
      height: 25px;
      cursor: pointer;
      font-weight: bold;
    }

    .btn-qty:hover { background-color: #f0f0f0; border-radius: 4px; }

    .subtotal { font-weight: bold; font-size: 1.1rem; min-width: 100px; text-align: right; }

    .btn-remove {
      background: none;
      border: none;
      color: var(--accent);
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0 0.5rem;
    }

    .cart-summary {
      background: #f8f9fa;
      padding: 2rem;
      border-radius: 8px;
      border: 1px solid var(--border);
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    .total-row {
      font-weight: bold;
      font-size: 1.2rem;
      border-top: 1px solid var(--border);
      padding-top: 1rem;
      margin-bottom: 2rem;
    }

    .full-width { width: 100%; text-align: center; }

    .empty-state {
      padding: 4rem 2rem;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .empty-state p { margin-bottom: 1.5rem; font-size: 1.1rem; color: var(--secondary); }
  `]
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;
  protected readonly environment = environment;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  updateQuantity(itemId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(itemId);
    } else {
      this.cartService.updateItemQuantity(itemId, quantity).subscribe(() => {
        this.loadCart();
      });
    }
  }

  removeItem(itemId: number): void {
    this.cartService.removeItem(itemId).subscribe(() => {
      this.loadCart();
    });
  }
}


