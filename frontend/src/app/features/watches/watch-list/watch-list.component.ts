import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { WatchService, Watch, WatchPage } from '../../../core/services/watch.service';
import { ProductFiltersComponent, FilterOptions } from '../product-filters/product-filters.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-watch-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductFiltersComponent],
  template: `
    <div class="page-container">
      <div class="container">
        <h1>Catalogue de Montres</h1>
        
        <div class="content-layout">
          <!-- Filters Sidebar -->
          <aside class="filters-sidebar">
            <app-product-filters (filtersChanged)="onFiltersChanged($event)"></app-product-filters>
          </aside>

          <!-- Products Grid -->
          <main class="products-main">
            <div class="products-header">
              <p class="results-count" *ngIf="watchPage">
                {{ watchPage.totalElements }} montre(s) trouvée(s)
              </p>
            </div>

            <div class="watches-grid" *ngIf="watchPage && watchPage.content.length > 0; else noResults">
              <div *ngFor="let watch of watchPage.content" class="watch-card" [routerLink]="['/watches', watch.id]">
                <div class="watch-image-container">
                  <img [src]="getWatchImage(watch)" [alt]="watch.name" class="watch-image">
                  <span class="stock-badge" [class.in-stock]="watch.stockQuantity > 0" [class.out-of-stock]="watch.stockQuantity === 0">
                    {{ watch.stockQuantity > 0 ? 'En stock' : 'Rupture' }}
                  </span>
                </div>
                <div class="watch-info">
                  <p class="brand">{{ watch.brand }}</p>
                  <h3>{{ watch.name }}</h3>
                  <p class="price">{{ watch.price | number:'1.0-0' }} {{ environment.currency }}</p>
                </div>
              </div>
            </div>

            <ng-template #noResults>
              <div class="no-results">
                <p>😔 Aucune montre ne correspond à vos critères</p>
                <p class="hint">Essayez d'ajuster vos filtres</p>
              </div>
            </ng-template>

            <!-- Pagination -->
            <div class="pagination" *ngIf="watchPage && watchPage.totalPages > 1">
              <button (click)="previousPage()" [disabled]="currentPage === 0" class="btn-page">
                ← Précédent
              </button>
              <span class="page-info">Page {{ currentPage + 1 }} / {{ watchPage.totalPages }}</span>
              <button (click)="nextPage()" [disabled]="currentPage >= watchPage.totalPages - 1" class="btn-page">
                Suivant →
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      min-height: 100vh;
      padding: 40px 0;
      background: var(--color-background);
    }

    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem;
      text-align: center;
      margin-bottom: 40px;
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .content-layout {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 40px;
      align-items: start;
    }

    .filters-sidebar {
      position: sticky;
      top: 100px;
    }

    .products-main {
      flex: 1;
    }

    .products-header {
      margin-bottom: 25px;
    }

    .results-count {
      font-size: 1rem;
      color: var(--color-text-secondary);
      font-weight: 500;
    }

    .watches-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 30px;
      margin-bottom: 40px;
    }

    .watch-card {
      background: white;
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      cursor: pointer;
      transition: all var(--transition-base);
      text-decoration: none;
      color: inherit;
    }

    .watch-card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-xl);
    }

    .watch-image-container {
      position: relative;
      overflow: hidden;
    }

    .watch-image {
      width: 100%;
      height: 300px;
      object-fit: cover;
      transition: transform var(--transition-slow);
    }

    .watch-card:hover .watch-image {
      transform: scale(1.1);
    }

    .stock-badge {
      position: absolute;
      top: 15px;
      right: 15px;
      padding: 6px 12px;
      border-radius: var(--radius-sm);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: var(--shadow-md);
    }

    .stock-badge.in-stock {
      background: var(--color-accent);
      color: white;
    }

    .stock-badge.out-of-stock {
      background: var(--color-danger);
      color: white;
    }

    .watch-info {
      padding: 20px;
    }

    .brand {
      font-size: 0.85rem;
      color: var(--color-text-secondary);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
      font-weight: 600;
    }

    .watch-info h3 {
      font-size: 1.2rem;
      margin-bottom: 12px;
      color: var(--color-text-primary);
      font-weight: 600;
    }

    .price {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-secondary);
      font-family: 'Playfair Display', serif;
    }

    .no-results {
      text-align: center;
      padding: 80px 20px;
      background: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
    }

    .no-results p {
      font-size: 1.2rem;
      color: var(--color-text-secondary);
      margin-bottom: 10px;
    }

    .no-results .hint {
      font-size: 1rem;
      color: var(--color-text-light);
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      margin-top: 40px;
    }

    .btn-page {
      padding: 12px 24px;
      border: 2px solid var(--color-border);
      background: white;
      border-radius: var(--radius-md);
      cursor: pointer;
      font-weight: 600;
      color: var(--color-text-primary);
      transition: all var(--transition-base);
    }

    .btn-page:hover:not(:disabled) {
      background: var(--color-secondary);
      color: var(--color-primary);
      border-color: var(--color-secondary);
      transform: translateY(-2px);
      box-shadow: var(--shadow-gold);
    }

    .btn-page:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .page-info {
      font-weight: 600;
      color: var(--color-text-primary);
      font-size: 1rem;
    }

    @media (max-width: 1024px) {
      .content-layout {
        grid-template-columns: 1fr;
      }

      .filters-sidebar {
        position: static;
      }
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2rem;
      }

      .watches-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class WatchListComponent implements OnInit {
  watchPage: WatchPage | null = null;
  currentPage = 0;
  currentFilters: any = {};
  protected readonly environment = environment;

  constructor(
    private watchService: WatchService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Check for category query param
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        // Category filter will be handled by ProductFiltersComponent
      }
      this.loadWatches();
    });
  }

  onFiltersChanged(filters: FilterOptions): void {
    this.currentFilters = {
      minPrice: filters.minPrice > 0 ? filters.minPrice : undefined,
      maxPrice: filters.maxPrice < 5000000 ? filters.maxPrice : undefined,
      categoryId: filters.categories.length > 0 ? filters.categories[0] : undefined,
      sort: filters.sort || undefined,
      availableOnly: true
    };
    this.currentPage = 0;
    this.loadWatches();
  }

  loadWatches(): void {
    this.watchService.getWatches(this.currentPage, 12, this.currentFilters).subscribe(page => {
      this.watchPage = page;
    });
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadWatches();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nextPage(): void {
    if (this.watchPage && this.currentPage < this.watchPage.totalPages - 1) {
      this.currentPage++;
      this.loadWatches();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getWatchImage(watch: Watch): string {
    if (watch.images && watch.images.length > 0) {
      const primaryImage = watch.images.find(img => img.isPrimary);
      return primaryImage ? primaryImage.imageUrl : watch.images[0].imageUrl;
    }
    return 'https://via.placeholder.com/300x300?text=No+Image';
  }
}
