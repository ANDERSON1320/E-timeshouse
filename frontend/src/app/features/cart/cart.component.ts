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
    /* Luxury Cart Styles */
    h1 { 
      font-family: serif; 
      color: var(--luxury-black); 
      margin-bottom: 3rem; 
      text-transform: uppercase; 
      letter-spacing: 0.1em;
      text-align: center;
    }
    
    .cart-container {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 4rem;
    }

    /* Cart Items List */
    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 0;
      border-top: 1px solid #eee;
    }

    .cart-item {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr auto;
      align-items: center;
      padding: 2rem 0;
      border-bottom: 1px solid #eee;
    }

    .item-info h3 { 
      font-family: serif; 
      font-size: 1.2rem; 
      margin: 0 0 0.5rem 0; 
      color: var(--luxury-black);
    }
    
    .brand { 
      text-transform: uppercase; 
      font-size: 0.75rem; 
      letter-spacing: 0.1em; 
      color: #888; 
      margin-bottom: 0.5rem;
    }
    
    .price { 
      font-size: 0.9rem; 
      color: #555; 
    }

    /* Quantity Controls */
    .quantity-controls {
      display: flex;
      align-items: center;
      border: 1px solid #ddd;
      width: fit-content;
    }

    .btn-qty {
      background: none;
      border: none;
      width: 30px;
      height: 30px;
      cursor: pointer;
      color: #555;
      transition: background 0.2s;
    }
    
    .btn-qty:hover { background-color: #f5f5f5; }

    .quantity-controls span {
      width: 30px;
      text-align: center;
      font-size: 0.9rem;
    }

    .subtotal {
      font-weight: 600;
      color: var(--luxury-black);
      font-size: 1rem;
    }

    .btn-remove {
      background: none;
      border: none;
      color: #999;
      font-size: 1.5rem;
      cursor: pointer;
      transition: color 0.2s;
    }
    
    .btn-remove:hover { color: #d32f2f; }

    /* Summary Section */
    .cart-summary {
      background: #f9f9f9;
      padding: 2.5rem;
      height: fit-content;
    }

    .cart-summary h2 {
      font-family: serif;
      font-size: 1.5rem;
      margin-top: 0;
      margin-bottom: 2rem;
      border-bottom: 1px solid #ddd;
      padding-bottom: 1rem;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      font-size: 0.95rem;
      color: #555;
    }

    .total-row {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid #ddd;
      font-weight: bold;
      font-family: serif;
      font-size: 1.4rem;
      color: var(--luxury-black);
    }

    .btn-primary {
      display: block;
      width: 100%;
      background-color: var(--luxury-gold);
      color: white;
      text-align: center;
      padding: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-weight: bold;
      font-size: 0.85rem;
      border: none;
      cursor: pointer;
      transition: background 0.3s;
      margin-top: 2rem;
    }
    
    .btn-primary:hover {
      background-color: var(--luxury-black);
    }

    .empty-state {
      text-align: center;
      padding: 4rem 0;
    }
    
    .empty-state p {
      font-family: serif;
      font-size: 1.2rem;
      color: #888;
      margin-bottom: 2rem;
    }
    
    @media (max-width: 768px) {
      .cart-container { grid-template-columns: 1fr; }
      .cart-item { 
        grid-template-columns: 1fr; 
        gap: 1rem;
        text-align: center;
      }
      .item-actions { justify-content: center; }
      .quantity-controls { margin: 0 auto; }
    }
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


