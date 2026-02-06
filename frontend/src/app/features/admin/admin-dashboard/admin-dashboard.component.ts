import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { OrderService, OrderPage } from '../../../core/services/order.service';
import { WatchService, Watch, WatchImage } from '../../../core/services/watch.service';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container">
      <h1>Tableau de bord administrateur</h1>
      <div class="dashboard-tabs">
        <button (click)="activeTab = 'watches'" [class.active]="activeTab === 'watches'">Montres</button>
        <button (click)="activeTab = 'orders'" [class.active]="activeTab === 'orders'">Commandes</button>
        <button (click)="activeTab = 'users'" [class.active]="activeTab === 'users'">Utilisateurs</button>
      </div>

      <div *ngIf="activeTab === 'watches'" class="tab-content">
        <div class="watches-header">
          <h2>Gestion des montres</h2>
          <button class="btn-add" (click)="showWatchForm = !showWatchForm">
            {{ showWatchForm ? 'Annuler' : '+ Ajouter une montre' }}
          </button>
        </div>

        <div *ngIf="showWatchForm" class="watch-form-card">
          <h3>{{ editingWatch ? 'Modifier' : 'Nouvelle' }} montre</h3>
          <form (ngSubmit)="saveWatch()">
            <div class="form-row">
              <div class="form-group">
                <label>Nom *</label>
                <input type="text" [(ngModel)]="watchForm.name" name="name" required>
              </div>
              <div class="form-group">
                <label>Marque *</label>
                <input type="text" [(ngModel)]="watchForm.brand" name="brand" required>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Modèle</label>
                <input type="text" [(ngModel)]="watchForm.model" name="model">
              </div>
              <div class="form-group">
                <label>Prix (€) *</label>
                <input type="number" [(ngModel)]="watchForm.price" name="price" required min="0" step="0.01">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Stock *</label>
                <input type="number" [(ngModel)]="watchForm.stockQuantity" name="stock" required min="0">
              </div>
              <div class="form-group">
                <label>Catégorie</label>
                <select [(ngModel)]="watchForm.categoryId" name="category">
                  <option [value]="null">Aucune</option>
                  <option *ngFor="let cat of categories" [value]="cat.id">{{ cat.name }}</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label>Description</label>
              <textarea [(ngModel)]="watchForm.description" name="description" rows="3"></textarea>
            </div>

            <div class="form-group">
              <label>URL de l'image</label>
              <input type="url" [(ngModel)]="imageUrl" name="imageUrl" placeholder="https://... ou assets/images/PHOTOS MONTRES/...">
              <small class="help-text">💡 Pour les images locales, placez vos fichiers dans <code>frontend/src/assets/images/PHOTOS MONTRES/</code> et utilisez le chemin <code>assets/images/PHOTOS MONTRES/votre-image.jpg</code></small>
              <button type="button" class="btn-secondary" (click)="addImage()" *ngIf="imageUrl">Ajouter l'image</button>
            </div>

            <div *ngIf="watchForm.images && watchForm.images.length > 0" class="images-list">
              <div *ngFor="let img of watchForm.images; let i = index" class="image-item">
                <img [src]="img.imageUrl" alt="Image {{ i + 1 }}">
                <button type="button" (click)="removeImage(i)">×</button>
                <label>
                  <input type="checkbox" [(ngModel)]="img.isPrimary" [name]="'primary-' + i" (change)="setPrimaryImage(i)">
                  Principale
                </label>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-primary">{{ editingWatch ? 'Mettre à jour' : 'Créer' }}</button>
              <button type="button" class="btn-secondary" (click)="cancelEdit()">Annuler</button>
            </div>
          </form>
        </div>

        <div class="watches-list">
          <div *ngFor="let watch of watches" class="watch-admin-card">
            <img [src]="getWatchImage(watch)" alt="{{ watch.name }}">
            <div class="watch-admin-info">
              <h4>{{ watch.name }}</h4>
              <p class="brand">{{ watch.brand }} - {{ watch.model }}</p>
              <p class="price">{{ watch.price | number:'1.2-2' }} €</p>
              <p class="stock">Stock: {{ watch.stockQuantity }}</p>
            </div>
            <div class="watch-admin-actions">
              <button class="btn-edit" (click)="editWatch(watch)">Modifier</button>
              <button class="btn-delete" (click)="deleteWatch(watch.id)">Supprimer</button>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="activeTab === 'orders'" class="tab-content">
        <h2>Commandes</h2>
        <div *ngIf="orders && orders.content.length > 0">
          <div *ngFor="let order of orders.content" class="order-card">
            <div class="order-header">
              <h3>{{ order.orderNumber }}</h3>
              <select [value]="order.status" (change)="updateOrderStatus(order.id, $event)">
                <option value="PENDING">En attente</option>
                <option value="PROCESSING">En traitement</option>
                <option value="SHIPPED">Expédiée</option>
                <option value="DELIVERED">Livrée</option>
                <option value="CANCELLED">Annulée</option>
              </select>
            </div>
            <p>Total: {{ order.totalAmount | number:'1.2-2' }} €</p>
            <p>Date: {{ order.createdAt | date:'dd/MM/yyyy' }}</p>
          </div>
        </div>
      </div>

      <div *ngIf="activeTab === 'users'" class="tab-content">
        <h2>Utilisateurs</h2>
        <div *ngIf="users && users.length > 0">
          <table class="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom d'utilisateur</th>
                <th>Email</th>
                <th>Nom</th>
                <th>Rôle</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let user of users">
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.firstName }} {{ user.lastName }}</td>
                <td>{{ user.role }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-tabs {
      display: flex;
      gap: 10px;
      margin: 20px 0;
    }
    .dashboard-tabs button {
      padding: 10px 20px;
      border: 1px solid var(--color-border);
      background: white;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition-base);
      font-weight: 500;
    }
    .dashboard-tabs button:hover {
      background: var(--color-surface);
      transform: translateY(-1px);
    }
    .dashboard-tabs button.active {
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
      color: white;
      border-color: var(--color-primary);
    }
    .tab-content {
      background: white;
      padding: 20px;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
    }
    .watches-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .btn-add {
      background: var(--color-secondary);
      color: var(--color-primary);
      padding: 10px 20px;
      border: none;
      border-radius: var(--radius-md);
      cursor: pointer;
      font-weight: 600;
      transition: all var(--transition-base);
    }
    .btn-add:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-gold);
    }
    .watch-form-card {
      background: var(--color-surface);
      padding: 20px;
      border-radius: var(--radius-lg);
      margin-bottom: 20px;
      border: 1px solid var(--color-border);
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }
    .help-text {
      display: block;
      margin-top: 5px;
      color: var(--color-text-secondary);
      font-size: 0.875rem;
      line-height: 1.4;
    }
    .help-text code {
      background: var(--color-surface);
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 0.85em;
    }
    .images-list {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 10px;
    }
    .image-item {
      position: relative;
      border: 2px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: 5px;
      background: white;
    }
    .image-item img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: var(--radius-sm);
    }
    .image-item button {
      position: absolute;
      top: -8px;
      right: -8px;
      background: var(--color-danger);
      color: white;
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
    }
    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    .watches-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .watch-admin-card {
      background: white;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 15px;
      display: flex;
      gap: 15px;
      align-items: center;
      transition: all var(--transition-base);
    }
    .watch-admin-card:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }
    .watch-admin-card img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border);
    }
    .watch-admin-info {
      flex: 1;
    }
    .watch-admin-info h4 {
      margin: 0 0 5px 0;
      color: var(--color-text-primary);
      font-size: 1.1rem;
    }
    .watch-admin-info .brand {
      color: var(--color-text-secondary);
      font-size: 0.875rem;
      margin-bottom: 5px;
    }
    .watch-admin-info .price {
      color: var(--color-secondary);
      font-weight: 600;
      font-size: 1.1rem;
    }
    .watch-admin-info .stock {
      color: var(--color-text-light);
      font-size: 0.875rem;
    }
    .watch-admin-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .btn-edit {
      background: var(--color-secondary);
      color: var(--color-primary);
      padding: 8px 16px;
      border: none;
      border-radius: var(--radius-md);
      cursor: pointer;
      font-weight: 500;
      transition: all var(--transition-base);
    }
    .btn-edit:hover {
      transform: translateY(-1px);
      box-shadow: var(--shadow-gold);
    }
    .btn-delete {
      background: white;
      color: var(--color-danger);
      padding: 8px 16px;
      border: 1px solid var(--color-danger);
      border-radius: var(--radius-md);
      cursor: pointer;
      font-weight: 500;
      transition: all var(--transition-base);
    }
    .btn-delete:hover {
      background: var(--color-danger);
      color: white;
      transform: translateY(-1px);
    }
    .order-card {
      padding: 15px;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      margin-bottom: 15px;
      background: white;
      transition: all var(--transition-base);
    }
    .order-card:hover {
      box-shadow: var(--shadow-sm);
    }
    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .users-table {
      width: 100%;
      border-collapse: collapse;
      background: white;
    }
    .users-table th,
    .users-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid var(--color-border);
    }
    .users-table th {
      background: var(--color-surface);
      font-weight: 600;
      color: var(--color-text-primary);
    }
    .users-table tr:hover {
      background: var(--color-surface);
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  activeTab = 'watches';
  orders: OrderPage | null = null;
  users: User[] = [];
  watches: Watch[] = [];
  categories: any[] = [];
  showWatchForm = false;
  editingWatch: Watch | null = null;
  imageUrl = '';

  watchForm: any = {
    name: '',
    brand: '',
    model: '',
    description: '',
    price: 0,
    stockQuantity: 0,
    categoryId: null,
    images: []
  };

  constructor(
    private http: HttpClient,
    private orderService: OrderService,
    private watchService: WatchService
  ) { }

  ngOnInit(): void {
    this.loadOrders();
    this.loadUsers();
    this.loadWatches();
    this.loadCategories();
  }

  loadOrders(): void {
    this.http.get<OrderPage>(`${environment.apiUrl}/admin/orders?page=0&size=20`).subscribe(page => {
      this.orders = page;
    });
  }

  loadUsers(): void {
    this.http.get<User[]>(`${environment.apiUrl}/admin/users`).subscribe(users => {
      this.users = users;
    });
  }

  updateOrderStatus(orderId: number, event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.orderService.updateOrderStatus(orderId, select.value).subscribe(() => {
      this.loadOrders();
    });
  }

  // Watch Management Methods
  loadWatches(): void {
    this.watchService.getWatches(0, 100).subscribe(page => {
      this.watches = page.content;
    });
  }

  loadCategories(): void {
    this.http.get<any[]>(`${environment.apiUrl}/categories`).subscribe(cats => {
      this.categories = cats;
    });
  }

  saveWatch(): void {
    if (this.editingWatch) {
      this.watchService.updateWatch(this.editingWatch.id, this.watchForm).subscribe(() => {
        this.loadWatches();
        this.cancelEdit();
      });
    } else {
      this.watchService.createWatch(this.watchForm).subscribe(() => {
        this.loadWatches();
        this.cancelEdit();
      });
    }
  }

  editWatch(watch: Watch): void {
    this.editingWatch = watch;
    this.watchForm = { ...watch };
    this.showWatchForm = true;
  }

  deleteWatch(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette montre ?')) {
      this.watchService.deleteWatch(id).subscribe(() => {
        this.loadWatches();
      });
    }
  }

  cancelEdit(): void {
    this.editingWatch = null;
    this.showWatchForm = false;
    this.imageUrl = '';
    this.watchForm = {
      name: '',
      brand: '',
      model: '',
      description: '',
      price: 0,
      stockQuantity: 0,
      categoryId: null,
      images: []
    };
  }

  addImage(): void {
    if (this.imageUrl) {
      if (!this.watchForm.images) {
        this.watchForm.images = [];
      }
      this.watchForm.images.push({
        imageUrl: this.imageUrl,
        isPrimary: this.watchForm.images.length === 0,
        displayOrder: this.watchForm.images.length + 1
      });
      this.imageUrl = '';
    }
  }

  removeImage(index: number): void {
    this.watchForm.images.splice(index, 1);
  }

  setPrimaryImage(index: number): void {
    this.watchForm.images.forEach((img: any, i: number) => {
      img.isPrimary = i === index;
    });
  }

  getWatchImage(watch: Watch): string {
    if (watch.images && watch.images.length > 0) {
      const primary = watch.images.find(img => img.isPrimary);
      return primary ? primary.imageUrl : watch.images[0].imageUrl;
    }
    return 'https://via.placeholder.com/150?text=No+Image';
  }
}

