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
    <div class="container">
      <h1>Mon panier</h1>
      <div *ngIf="cart && cart.items.length > 0; else emptyCart">
        <div class="cart-items">
          <div *ngFor="let item of cart.items" class="cart-item">
            <img [src]="item.watchImageUrl || 'https://via.placeholder.com/100'" [alt]="item.watchName" class="item-image">
            <div class="item-details">
              <h3>{{ item.watchName }}</h3>
              <p>{{ item.watchBrand }}</p>
              <p class="price">{{ item.watchPrice | number:'1.0-0' }} {{ environment.currency }}</p>
            </div>
            <div class="item-quantity">
              <button (click)="updateQuantity(item.id, item.quantity - 1)">-</button>
              <span>{{ item.quantity }}</span>
              <button (click)="updateQuantity(item.id, item.quantity + 1)">+</button>
            </div>
            <div class="item-subtotal">
              <p>{{ item.subtotal | number:'1.0-0' }} {{ environment.currency }}</p>
            </div>
            <button (click)="removeItem(item.id)" class="btn-danger">Supprimer</button>
          </div>
        </div>
        <div class="cart-summary">
          <h2>Résumé</h2>
          <p>Total articles: {{ cart.totalItems }}</p>
          <p class="total">Total: {{ cart.totalAmount | number:'1.0-0' }} {{ environment.currency }}</p>
          <a routerLink="/checkout" class="btn-primary">Passer la commande</a>
        </div>
      </div>
      <ng-template #emptyCart>
        <p class="empty-cart">Votre panier est vide.</p>
        <a routerLink="/watches" class="btn-primary">Continuer les achats</a>
      </ng-template>
    </div>
  `,
  styles: [`
    .cart-items {
      margin-bottom: 30px;
    }
    .cart-item {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 20px;
      background: white;
      border-radius: 8px;
      margin-bottom: 15px;
    }
    .item-image {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 4px;
    }
    .item-details {
      flex: 1;
    }
    .item-quantity {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .item-quantity button {
      width: 30px;
      height: 30px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
    }
    .cart-summary {
      background: white;
      padding: 20px;
      border-radius: 8px;
    }
    .total {
      font-size: 24px;
      font-weight: bold;
      color: #1976d2;
    }
    .empty-cart {
      text-align: center;
      padding: 40px;
      font-size: 18px;
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


