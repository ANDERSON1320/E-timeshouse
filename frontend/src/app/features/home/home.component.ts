import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HeroSliderComponent } from '../../shared/components/hero-slider/hero-slider.component';
import { Watch, WatchService } from '../../core/services/watch.service';

interface WatchPage {
  content: Watch[];
  totalElements: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroSliderComponent],
  template: `
    <div class="home-container">
      <!-- Hero Slider -->
      <app-hero-slider></app-hero-slider>

      <!-- Nouveautés -->
      <section class="section new-arrivals">
        <div class="container">
          <div class="section-header">
            <h2>Nouveautés</h2>
            <p>Découvrez les dernières montres ajoutées à notre collection</p>
          </div>
          <div class="watches-grid" *ngIf="newArrivals.length > 0; else loading">
            <div *ngFor="let watch of newArrivals" class="watch-card" [routerLink]="['/watches', watch.id]">
              <div class="watch-image-container">
                <img [src]="getWatchImage(watch)" [alt]="watch.name" class="watch-image">
                <span class="badge new">Nouveau</span>
              </div>
              <div class="watch-info">
                <h3>{{ watch.name }}</h3>
                <p class="brand">{{ watch.brand }}</p>
                <p class="price">{{ watch.price | number:'1.0-0' }} {{ environment.currency }}</p>
              </div>
            </div>
          </div>
          <div class="section-footer">
            <a routerLink="/watches" class="btn-secondary">Voir toutes les nouveautés</a>
          </div>
        </div>
      </section>

      <!-- Meilleures Ventes -->
      <section class="section best-sellers">
        <div class="container">
          <div class="section-header">
            <h2>Meilleures Ventes</h2>
            <p>Les montres préférées de nos clients</p>
          </div>
          <div class="watches-grid" *ngIf="bestSellers.length > 0; else loading">
            <div *ngFor="let watch of bestSellers" class="watch-card" [routerLink]="['/watches', watch.id]">
              <div class="watch-image-container">
                <img [src]="getWatchImage(watch)" [alt]="watch.name" class="watch-image">
                <span class="badge bestseller">Best Seller</span>
              </div>
              <div class="watch-info">
                <h3>{{ watch.name }}</h3>
                <p class="brand">{{ watch.brand }}</p>
                <p class="price">{{ watch.price | number:'1.0-0' }} {{ environment.currency }}</p>
              </div>
            </div>
          </div>
          <div class="section-footer">
            <a routerLink="/watches" class="btn-secondary">Voir toutes les montres</a>
          </div>
        </div>
      </section>

      <!-- Categories -->
      <section class="section categories">
        <div class="container">
          <div class="section-header">
            <h2>Catégories Populaires</h2>
            <p>Explorez nos collections par catégorie</p>
          </div>
          <div class="categories-grid">
            <div class="category-card" routerLink="/watches">
              <div class="category-icon"></div>
              <h3>Luxe</h3>
              <p>Montres haut de gamme</p>
            </div>
            <div class="category-card" routerLink="/watches">
              <div class="category-icon"></div>
              <h3>Sport</h3>
              <p>Montres sportives</p>
            </div>
            <div class="category-card" routerLink="/watches">
              <div class="category-icon"></div>
              <h3>Classique</h3>
              <p>Élégance intemporelle</p>
            </div>
            <div class="category-card" routerLink="/watches">
              <div class="category-icon"></div>
              <h3>Connectée</h3>
              <p>Montres intelligentes</p>
            </div>
          </div>
        </div>
      </section>

      <ng-template #loading>
        <p class="loading">Chargement...</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .home-container {
      animation: fadeIn 0.5s ease-in-out;
    }

    .section {
      padding: 60px 0;
    }

    .section:nth-child(even) {
      background: var(--color-surface);
    }

    .section-header {
      text-align: center;
      margin-bottom: 50px;
    }

    .section-header h2 {
      font-size: 2.5rem;
      margin-bottom: 10px;
      color: var(--color-text-primary);
    }

    .section-header p {
      font-size: 1.1rem;
      color: var(--color-text-secondary);
    }

    .section-footer {
      text-align: center;
      margin-top: 40px;
    }

    .watches-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 30px;
      animation: slideUp 0.6s ease-out;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .watch-card {
      background: white;
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      cursor: pointer;
      transition: all var(--transition-base);
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

    .badge {
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

    .badge.new {
      background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
      color: white;
    }

    .badge.bestseller {
      background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-light) 100%);
      color: var(--color-primary);
    }

    .watch-info {
      padding: 20px;
    }

    .watch-info h3 {
      margin-bottom: 8px;
      font-size: 1.2rem;
      color: var(--color-text-primary);
    }

    .brand {
      color: var(--color-text-secondary);
      margin-bottom: 12px;
      font-size: 0.95rem;
    }

    .price {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-secondary);
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 25px;
    }

    .category-card {
      background: white;
      padding: 40px 20px;
      border-radius: var(--radius-lg);
      text-align: center;
      cursor: pointer;
      transition: all var(--transition-base);
      border: 2px solid var(--color-border);
    }

    .category-card:hover {
      border-color: var(--color-secondary);
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }

    .category-icon {
      font-size: 3rem;
      margin-bottom: 15px;
    }

    .category-card h3 {
      margin-bottom: 8px;
      color: var(--color-text-primary);
    }

    .category-card p {
      color: var(--color-text-secondary);
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .section {
        padding: 40px 0;
      }

      .section-header h2 {
        font-size: 2rem;
      }

      .watches-grid {
        grid-template-columns: 1fr;
      }

      .categories-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  newArrivals: Watch[] = [];
  bestSellers: Watch[] = [];
  protected readonly environment = environment;

  constructor(
    private http: HttpClient,
    private watchService: WatchService
  ) { }

  ngOnInit(): void {
    this.loadNewArrivals();
    this.loadBestSellers();
  }

  loadNewArrivals(): void {
    this.http.get<WatchPage>(`${environment.apiUrl}/home/new-arrivals`).subscribe(page => {
      this.newArrivals = page.content;
    });
  }

  loadBestSellers(): void {
    this.http.get<WatchPage>(`${environment.apiUrl}/home/best-sellers`).subscribe(page => {
      this.bestSellers = page.content;
    });
  }

  getWatchImage(watch: Watch): string {
    if (watch.images && watch.images.length > 0) {
      const primaryImage = watch.images.find(img => img.isPrimary);
      return primaryImage ? primaryImage.imageUrl : watch.images[0].imageUrl;
    }
    return 'https://via.placeholder.com/300x300?text=No+Image';
  }
}
