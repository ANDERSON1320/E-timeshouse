import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="pt-32 pb-20 container mx-auto px-6 min-h-screen">
      <div class="flex justify-between items-center mb-12">
        <h1 class="text-3xl font-serif font-bold text-luxury-black">Gestion des Commandes</h1>
      </div>

      <div class="bg-white shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th class="py-4 px-6 text-xs font-bold uppercase tracking-widest text-gray-500">Réf</th>
                <th class="py-4 px-6 text-xs font-bold uppercase tracking-widest text-gray-500">Date</th>
                <th class="py-4 px-6 text-xs font-bold uppercase tracking-widest text-gray-500">Client</th>
                <th class="py-4 px-6 text-xs font-bold uppercase tracking-widest text-gray-500">Total</th>
                <th class="py-4 px-6 text-xs font-bold uppercase tracking-widest text-gray-500">Statut</th>
                <th class="py-4 px-6 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody *ngIf="orders.length > 0; else emptyState">
              <tr *ngFor="let order of orders" class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td class="py-4 px-6 font-medium text-luxury-black">#{{ order.id }}</td>
                <td class="py-4 px-6 text-gray-600">{{ order.createdAt | date:'short' }}</td>
                <td class="py-4 px-6 text-gray-600">
                    <span *ngIf="order.shippingAddress">{{ order.shippingAddress.fullName }}</span>
                    <span *ngIf="!order.shippingAddress">Client</span>
                </td>
                <td class="py-4 px-6 font-bold text-luxury-gold">{{ order.totalAmount | number:'1.0-0' }} {{ environment.currency }}</td>
                <td class="py-4 px-6">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide"
                        [ngClass]="{
                          'bg-yellow-100 text-yellow-800': order.status === 'PENDING',
                          'bg-blue-100 text-blue-800': order.status === 'Processing',
                          'bg-green-100 text-green-800': order.status === 'Completed' || order.status === 'Shipped',
                          'bg-red-100 text-red-800': order.status === 'Cancelled'
                        }">
                    {{ order.status }}
                  </span>
                </td>
                <td class="py-4 px-6 text-right">
                  <button class="text-luxury-gold hover:text-luxury-black transition-colors text-xs font-bold uppercase tracking-widest">
                    Détails
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <ng-template #emptyState>
          <div class="py-12 text-center text-gray-500">
            Aucune commande trouvée.
          </div>
        </ng-template>

        <!-- Pagination -->
        <div class="p-6 border-t border-gray-200 flex justify-between items-center" *ngIf="orderPage && orderPage.totalPages > 1">
           <button (click)="changePage(currentPage - 1)" [disabled]="currentPage === 0" class="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-luxury-black disabled:opacity-30">Précédent</button>
           <span class="text-sm">Page {{ currentPage + 1 }} sur {{ orderPage.totalPages }}</span>
           <button (click)="changePage(currentPage + 1)" [disabled]="currentPage >= orderPage.totalPages - 1" class="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-luxury-black disabled:opacity-30">Suivant</button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AdminOrdersComponent implements OnInit {
  orders: any[] = [];
  orderPage: any | null = null;
  currentPage = 0;
  protected readonly environment = environment;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    // If getAllOrders exists in service call it
    // else we need to add it
    this.orderService.getAllOrders(this.currentPage, 10).subscribe({
      next: (page: any) => {
        this.orderPage = page;
        this.orders = page.content;
      },
      error: (err: any) => console.error('Error loading orders', err)
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadOrders();
  }
}
