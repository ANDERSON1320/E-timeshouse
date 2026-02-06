import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface Category {
  id: number;
  name: string;
}

export interface FilterOptions {
  minPrice: number;
  maxPrice: number;
  categories: number[];
  sort: string;
}

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filters-container">
      <div class="filters-header">
        <h3>Filtres</h3>
        <button class="btn-reset" (click)="resetFilters()">Réinitialiser</button>
      </div>

      <!-- Price Range -->
      <div class="filter-section">
        <h4>Prix</h4>
        <div class="price-inputs">
          <input type="number" [(ngModel)]="minPrice" (change)="applyFilters()" 
                 placeholder="Min" class="price-input">
          <span>-</span>
          <input type="number" [(ngModel)]="maxPrice" (change)="applyFilters()" 
                 placeholder="Max" class="price-input">
        </div>
        <div class="price-range">
          <input type="range" [(ngModel)]="minPrice" [min]="0" [max]="5000000" 
                 (input)="applyFilters()" class="range-slider">
          <input type="range" [(ngModel)]="maxPrice" [min]="0" [max]="5000000" 
                 (input)="applyFilters()" class="range-slider">
        </div>
        <div class="price-labels">
          <span>{{ minPrice }} {{ environment.currency }}</span>
          <span>{{ maxPrice }} {{ environment.currency }}</span>
        </div>
      </div>

      <!-- Categories -->
      <div class="filter-section">
        <h4>Catégories</h4>
        <div class="category-list">
          <label *ngFor="let category of categories" class="checkbox-label">
            <input type="checkbox" 
                   [value]="category.id"
                   (change)="toggleCategory(category.id)"
                   [checked]="selectedCategories.includes(category.id)">
            <span>{{ category.name }}</span>
          </label>
        </div>
      </div>

      <!-- Sort -->
      <div class="filter-section">
        <h4>Trier par</h4>
        <select [(ngModel)]="sortOption" (change)="applyFilters()" class="sort-select">
          <option value="">Par défaut</option>
          <option value="price_asc">Prix croissant</option>
          <option value="price_desc">Prix décroissant</option>
          <option value="newest">Plus récent</option>
          <option value="popular">Popularité</option>
        </select>
      </div>
    </div>
  `,
  styles: [`
    .filters-container {
      background: white;
      border-radius: var(--radius-lg);
      padding: 20px;
      box-shadow: var(--shadow-md);
      position: sticky;
      top: 100px;
    }

    .filters-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 2px solid var(--color-border);
    }

    .filters-header h3 {
      margin: 0;
      font-size: 1.3rem;
      color: var(--color-text-primary);
    }

    .btn-reset {
      background: none;
      border: 1px solid var(--color-border);
      padding: 6px 12px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-size: 0.85rem;
      color: var(--color-text-secondary);
      transition: all var(--transition-base);
    }

    .btn-reset:hover {
      background: var(--color-danger);
      color: white;
      border-color: var(--color-danger);
    }

    .filter-section {
      margin-bottom: 30px;
    }

    .filter-section h4 {
      font-size: 1rem;
      margin-bottom: 15px;
      color: var(--color-text-primary);
      font-weight: 600;
    }

    .price-inputs {
      display: flex;
      gap: 10px;
      align-items: center;
      margin-bottom: 15px;
    }

    .price-input {
      flex: 1;
      padding: 8px 12px;
      border: 2px solid var(--color-border);
      border-radius: var(--radius-md);
      font-size: 0.9rem;
      transition: all var(--transition-base);
    }

    .price-input:focus {
      outline: none;
      border-color: var(--color-secondary);
    }

    .price-range {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 10px;
    }

    .range-slider {
      width: 100%;
      height: 6px;
      border-radius: 5px;
      background: var(--color-surface);
      outline: none;
      -webkit-appearance: none;
    }

    .range-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--color-secondary);
      cursor: pointer;
      box-shadow: var(--shadow-sm);
    }

    .range-slider::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--color-secondary);
      cursor: pointer;
      border: none;
    }

    .price-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      color: var(--color-text-secondary);
      font-weight: 600;
    }

    .category-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      padding: 8px;
      border-radius: var(--radius-sm);
      transition: all var(--transition-base);
    }

    .checkbox-label:hover {
      background: var(--color-surface);
    }

    .checkbox-label input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: var(--color-secondary);
    }

    .checkbox-label span {
      font-size: 0.95rem;
      color: var(--color-text-primary);
    }

    .sort-select {
      width: 100%;
      padding: 10px 12px;
      border: 2px solid var(--color-border);
      border-radius: var(--radius-md);
      font-size: 0.95rem;
      background: white;
      cursor: pointer;
      transition: all var(--transition-base);
    }

    .sort-select:focus {
      outline: none;
      border-color: var(--color-secondary);
    }

    @media (max-width: 768px) {
      .filters-container {
        position: static;
        margin-bottom: 20px;
      }
    }
  `]
})
export class ProductFiltersComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<FilterOptions>();

  categories: Category[] = [];
  selectedCategories: number[] = [];
  minPrice = 0;
  maxPrice = 5000000;
  sortOption = '';
  protected readonly environment = environment;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.http.get<Category[]>(`${environment.apiUrl}/categories`).subscribe(cats => {
      this.categories = cats;
    });
  }

  toggleCategory(categoryId: number): void {
    const index = this.selectedCategories.indexOf(categoryId);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(categoryId);
    }
    this.applyFilters();
  }

  applyFilters(): void {
    this.filtersChanged.emit({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      categories: this.selectedCategories,
      sort: this.sortOption
    });
  }

  resetFilters(): void {
    this.minPrice = 0;
    this.maxPrice = 5000000;
    this.selectedCategories = [];
    this.sortOption = '';
    this.applyFilters();
  }
}
