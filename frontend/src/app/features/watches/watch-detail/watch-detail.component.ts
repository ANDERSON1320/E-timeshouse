import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { WatchService, Watch, ProductVariant } from '../../../core/services/watch.service';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-watch-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container" *ngIf="watch; else loading">
      <div class="watch-detail">
        <div class="watch-images">
          <img [src]="selectedImage || getPrimaryImage()" [alt]="watch.name" class="main-image">
          <div class="thumbnail-list" *ngIf="watch.images && watch.images.length > 1">
            <img *ngFor="let img of watch.images" 
                 [src]="img.imageUrl" 
                 [alt]="watch.name"
                 (click)="selectedImage = img.imageUrl"
                 [class.active]="selectedImage === img.imageUrl || (!selectedImage && img.isPrimary)"
                 class="thumbnail">
          </div>
        </div>
        <div class="watch-info">
          <h1>{{ watch.name }}</h1>
          <p class="brand">{{ watch.brand }} - {{ watch.model }}</p>
          <p class="price">{{ getCurrentPrice() | number:'1.0-0' }} {{ environment.currency }}</p>
          <p class="description">{{ watch.description }}</p>
          
          <!-- Variants Selection -->
          <div class="variants-section" *ngIf="variants.length > 0">
            <div class="variant-group" *ngIf="hasSizes()">
              <label>Taille:</label>
              <div class="variant-options">
                <button *ngFor="let size of getUniqueSizes()" 
                        (click)="selectSize(size)"
                        [class.selected]="selectedSize === size"
                        class="variant-btn">
                  {{ size }}
                </button>
              </div>
            </div>

            <div class="variant-group" *ngIf="hasColors()">
              <label>Couleur:</label>
              <div class="variant-options">
                <button *ngFor="let color of getUniqueColors()" 
                        (click)="selectColor(color)"
                        [class.selected]="selectedColor === color"
                        class="variant-btn">
                  {{ color }}
                </button>
              </div>
            </div>
          </div>

          <div class="stock-info">
            <span [class.in-stock]="getCurrentStock() > 0" [class.out-of-stock]="getCurrentStock() === 0">
              {{ getCurrentStock() > 0 ? 'En stock (' + getCurrentStock() + ')' : 'Rupture de stock' }}
            </span>
          </div>
          
          <div class="actions">
            <input type="number" [(ngModel)]="quantity" min="1" [max]="getCurrentStock()" class="quantity-input">
            <button (click)="addToCart()" 
                    [disabled]="getCurrentStock() === 0 || (variants.length > 0 && !selectedVariant)" 
                    class="btn-primary">
              Ajouter au panier
            </button>
            <button (click)="buyNow()" 
                    [disabled]="getCurrentStock() === 0 || (variants.length > 0 && !selectedVariant)" 
                    class="btn-secondary">
              Acheter Maintenant
            </button>
          </div>
        </div>
      </div>
    </div>
    <ng-template #loading>
      <div class="loading">Chargement...</div>
    </ng-template>
  `,
  styles: [`
    .watch-detail {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-top: 40px;
    }
    .main-image {
      width: 100%;
      height: 500px;
      object-fit: cover;
      border-radius: 8px;
    }
    .thumbnail-list {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }
    .thumbnail {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 4px;
      cursor: pointer;
      border: 2px solid transparent;
    }
    .thumbnail.active {
      border-color: #1976d2;
    }
    .watch-info h1 {
      margin-bottom: 10px;
    }
    .brand {
      color: #666;
      margin-bottom: 20px;
    }
    .price {
      font-size: 32px;
      font-weight: bold;
      color: #1976d2;
      margin-bottom: 20px;
    }
    .description {
      line-height: 1.6;
      margin-bottom: 20px;
    }
    .actions {
      display: flex;
      gap: 10px;
      margin-top: 30px;
    }
    .quantity-input {
      width: 80px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .in-stock {
      color: #388e3c;
    }
    .out-of-stock {
      color: #d32f2f;
    }
    .variants-section {
      margin: 20px 0;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .variant-group {
      margin-bottom: 15px;
    }
    .variant-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
    }
    .variant-options {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .variant-btn {
      padding: 8px 16px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .variant-btn:hover {
      border-color: #1976d2;
    }
    .variant-btn.selected {
      background: #1976d2;
      color: white;
      border-color: #1976d2;
    }
    .btn-secondary {
      background-color: #f57c00;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }
    .btn-secondary:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class WatchDetailComponent implements OnInit {
  watch: Watch | null = null;
  variants: ProductVariant[] = [];
  selectedImage: string | null = null;
  quantity = 1;

  selectedSize: string | null = null;
  selectedColor: string | null = null;
  selectedVariant: ProductVariant | null = null;
  protected readonly environment = environment;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private watchService: WatchService,
    private cartService: CartService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.watchService.getWatchById(+id).subscribe(watch => {
        this.watch = watch;
        this.selectedImage = this.getPrimaryImage();

        // Fetch variants
        this.watchService.getWatchVariants(+id).subscribe(variants => {
          this.variants = variants;
          // Auto-select first variant if exists
          if (this.variants.length > 0) {
            // Logic to auto select could be added here
          }
        });
      });
    }
  }

  getPrimaryImage(): string {
    if (this.watch?.images && this.watch.images.length > 0) {
      const primary = this.watch.images.find(img => img.isPrimary);
      return primary ? primary.imageUrl : this.watch.images[0].imageUrl;
    }
    return 'https://via.placeholder.com/500x500?text=No+Image';
  }

  hasSizes(): boolean {
    return this.variants.some(v => v.size);
  }

  hasColors(): boolean {
    return this.variants.some(v => v.color);
  }

  getUniqueSizes(): string[] {
    return [...new Set(this.variants.map(v => v.size).filter(s => !!s))];
  }

  getUniqueColors(): string[] {
    return [...new Set(this.variants.map(v => v.color).filter(c => !!c))];
  }

  selectSize(size: string): void {
    this.selectedSize = size;
    this.updateSelectedVariant();
  }

  selectColor(color: string): void {
    this.selectedColor = color;
    this.updateSelectedVariant();
  }

  updateSelectedVariant(): void {
    if (this.variants.length === 0) return;

    this.selectedVariant = this.variants.find(v =>
      (!v.size || v.size === this.selectedSize) &&
      (!v.color || v.color === this.selectedColor)
    ) || null;
  }

  getCurrentPrice(): number {
    if (this.selectedVariant) {
      return (this.watch?.price || 0) + (this.selectedVariant.priceAdjustment || 0);
    }
    return this.watch?.price || 0;
  }

  getCurrentStock(): number {
    if (this.variants.length > 0) {
      return this.selectedVariant ? this.selectedVariant.stockQuantity : 0;
    }
    return this.watch?.stockQuantity || 0;
  }

  addToCart(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.watch) {
      // If variants exist but none selected, show error
      if (this.variants.length > 0 && !this.selectedVariant) {
        alert('Veuillez sélectionner les options');
        return;
      }

      // TODO: Update CartService to handle variants
      // For now we just add the base item, but ideally we pass the variant ID
      this.cartService.addItem(this.watch.id, this.quantity).subscribe(() => {
        alert('Article ajouté au panier !');
      });
    }
  }

  buyNow(): void {
    this.addToCart();
    this.router.navigate(['/cart']);
  }
}

