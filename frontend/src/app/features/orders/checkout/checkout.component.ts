import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, Cart } from '../../../core/services/cart.service';
import { OrderService, CreateOrderRequest } from '../../../core/services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Finaliser la commande</h1>
      <div class="checkout-content" *ngIf="cart">
        <div class="shipping-form">
          <h2>Adresse de livraison</h2>
          <form (ngSubmit)="submitOrder()">
            <div class="form-group">
              <label>Adresse</label>
              <input type="text" [(ngModel)]="orderRequest.shippingAddress" name="address" required>
            </div>
            <div class="form-group">
              <label>Ville</label>
              <input type="text" [(ngModel)]="orderRequest.shippingCity" name="city" required>
            </div>
            <div class="form-group">
              <label>Code postal</label>
              <input type="text" [(ngModel)]="orderRequest.shippingPostalCode" name="postalCode" required>
            </div>
            <div class="form-group">
              <label>Pays</label>
              <input type="text" [(ngModel)]="orderRequest.shippingCountry" name="country" required>
            </div>
            <button type="submit" class="btn-primary" [disabled]="!cart || cart.items.length === 0">
              Confirmer la commande
            </button>
          </form>
        </div>
        <div class="order-summary">
          <h2>Résumé</h2>
          <div *ngFor="let item of cart.items" class="summary-item">
            <span>{{ item.watchName }} x {{ item.quantity }}</span>
            <span>{{ item.subtotal | number:'1.2-2' }} €</span>
          </div>
          <div class="total">
            <strong>Total: {{ cart.totalAmount | number:'1.2-2' }} €</strong>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checkout-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 40px;
      margin-top: 30px;
    }
    .shipping-form {
      background: white;
      padding: 30px;
      border-radius: 8px;
    }
    .order-summary {
      background: white;
      padding: 30px;
      border-radius: 8px;
      height: fit-content;
    }
    .summary-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .total {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      font-size: 20px;
    }
  `]
})
export class CheckoutComponent implements OnInit {
  cart: Cart | null = null;
  orderRequest: CreateOrderRequest = {
    shippingAddress: '',
    shippingCity: '',
    shippingPostalCode: '',
    shippingCountry: ''
  };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      if (!cart || cart.items.length === 0) {
        this.router.navigate(['/cart']);
      }
      this.cart = cart;
    });
  }

  submitOrder(): void {
    if (this.cart && this.cart.items.length > 0) {
      this.orderService.createOrder(this.orderRequest).subscribe(() => {
        alert('Commande créée avec succès !');
        this.router.navigate(['/orders']);
      });
    }
  }
}


