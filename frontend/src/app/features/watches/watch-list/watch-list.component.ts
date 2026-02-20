import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { WatchService, Watch, WatchPage } from '../../../core/services/watch.service';
import { CartService } from '../../../core/services/cart.service';
import { environment } from '../../../../environments/environment';
import { AccordionComponent } from '../../../shared/components/accordion/accordion.component';
import { SkeletonLoaderComponent } from '../../../shared/components/skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-watch-list',
  standalone: true,
  imports: [CommonModule, RouterModule, AccordionComponent, SkeletonLoaderComponent],
  template: `
    <div class="pt-32 pb-20 container mx-auto px-6">
      <!-- Page Header -->
      <div class="text-center mb-16 animate-fade-in-up">
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-luxury-black mb-4">La Collection</h1>
        <div class="w-24 h-1 bg-luxury-gold mx-auto"></div>
        <p class="mt-4 text-gray-500 max-w-2xl mx-auto">Explorez notre gamme de montres de prestige, conçues pour l'excellence et l'élégance.</p>
      </div>

      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Sidebar Filters (Desktop) -->
        <aside class="w-full lg:w-1/4 hidden lg:block space-y-8 animate-fade-in-up delay-100">
           <!-- Filters Content (Unchanged) -->
           <div>
            <h3 class="text-lg font-serif font-bold mb-6 border-b border-gray-200 pb-2">Filtres</h3>
            
            <app-accordion title="Catégorie" [isOpen]="true">
              <div class="space-y-2">
                <label class="flex items-center space-x-3 cursor-pointer group">
                  <input type="checkbox" class="form-checkbox text-luxury-gold rounded-sm border-gray-300 focus:ring-luxury-gold">
                  <span class="text-gray-600 group-hover:text-luxury-gold transition-colors">Homme</span>
                </label>
                <label class="flex items-center space-x-3 cursor-pointer group">
                  <input type="checkbox" class="form-checkbox text-luxury-gold rounded-sm border-gray-300 focus:ring-luxury-gold">
                  <span class="text-gray-600 group-hover:text-luxury-gold transition-colors">Femme</span>
                </label>
                <!-- ... other filters ... -->
              </div>
            </app-accordion>
            
             <app-accordion title="Prix" [isOpen]="false">
              <div class="space-y-2">
                <!-- ... price filters ... -->
                 <label class="flex items-center space-x-3 cursor-pointer group">
                  <input type="radio" name="price" class="form-radio text-luxury-gold border-gray-300 focus:ring-luxury-gold">
                  <span class="text-gray-600 group-hover:text-luxury-gold transition-colors">Moins de 500k</span>
                </label>
                 <label class="flex items-center space-x-3 cursor-pointer group">
                  <input type="radio" name="price" class="form-radio text-luxury-gold border-gray-300 focus:ring-luxury-gold">
                  <span class="text-gray-600 group-hover:text-luxury-gold transition-colors">+ 1M</span>
                </label>
              </div>
            </app-accordion>
           </div>
        </aside>

        <!-- Product Grid -->
        <div class="w-full lg:w-3/4">
          
          <!-- Loading State -->
          <div *ngIf="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
             <div *ngFor="let i of [1,2,3,4,5,6]" class="bg-white">
                <app-skeleton-loader height="300px" className="mb-4"></app-skeleton-loader>
                <div class="text-center space-y-2">
                   <app-skeleton-loader height="12px" width="60%" className="mx-auto"></app-skeleton-loader>
                   <app-skeleton-loader height="20px" width="80%" className="mx-auto"></app-skeleton-loader>
                   <app-skeleton-loader height="16px" width="40%" className="mx-auto"></app-skeleton-loader>
                </div>
             </div>
          </div>

          <!-- Loaded State -->
          <div *ngIf="!isLoading">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12" *ngIf="watchPage && watchPage.content.length > 0; else noResults">
              
              <!-- Watch Card -->
              <div *ngFor="let watch of watchPage.content" class="group relative bg-white animate-fade-in-up delay-200">
                <div class="aspect-[3/4] overflow-hidden bg-gray-50 relative mb-4">
                  <img [src]="getWatchImage(watch)" 
                       [alt]="watch.name" 
                       loading="lazy"
                       (error)="handleImageError($event)"
                       class="w-full h-full object-contain p-8 transform group-hover:scale-105 transition-transform duration-700 ease-out">
                  
                  <!-- Quick Action Overlay -->
                  <div class="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/90 backdrop-blur-sm border-t border-gray-100 flex justify-center">
                    <button (click)="addToCart(watch)" class="w-full bg-luxury-black text-white text-xs font-bold uppercase tracking-widest py-3 hover:bg-luxury-gold transition-colors duration-300">
                      Ajouter au Panier
                    </button>
                  </div>
                </div>

                <div class="text-center">
                  <p class="text-xs text-gray-400 uppercase tracking-widest mb-1">{{ watch.brand }}</p>
                  <h3 class="text-lg font-serif font-medium text-luxury-black mb-2 group-hover:text-luxury-gold transition-colors">{{ watch.name }}</h3>
                  <p class="text-luxury-black font-bold">{{ watch.price | number:'1.0-0' }} <span class="text-xs align-top">{{ environment.currency }}</span></p>
                </div>
              </div>

            </div>

            <!-- Pagination -->
            <div class="mt-20 flex justify-center gap-4" *ngIf="watchPage && watchPage.totalPages > 1">
              <button (click)="previousPage()" [disabled]="currentPage === 0" class="px-6 py-2 border border-gray-200 text-sm uppercase tracking-widest hover:border-luxury-gold hover:text-luxury-gold disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                Précédent
              </button>
              <button (click)="nextPage()" [disabled]="currentPage >= watchPage.totalPages - 1" class="px-6 py-2 border border-gray-200 text-sm uppercase tracking-widest hover:border-luxury-gold hover:text-luxury-gold disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                Suivant
              </button>
            </div>

            <ng-template #noResults>
              <div class="text-center py-20 bg-gray-50 rounded-lg">
                <p class="text-gray-500 font-serif text-xl">Aucune montre ne correspond à vos critères.</p>
                <button (click)="loadWatches()" class="mt-6 text-luxury-gold underline hover:text-luxury-black transition-colors">Voir tout le catalogue</button>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .delay-100 { animation-delay: 100ms; }
    .delay-200 { animation-delay: 200ms; }
    
    @keyframes fadeInUp {
      from { opacity: 0; transform: translate3d(0, 20px, 0); }
      to { opacity: 1; transform: translate3d(0, 0, 0); }
    }
    
    .animate-fade-in-up {
      animation-name: fadeInUp;
      animation-duration: 0.8s;
      animation-fill-mode: both;
    }
  `]
})
export class WatchListComponent implements OnInit {
  watchPage: WatchPage | null = null;
  currentPage = 0;
  isLoading = true;
  protected readonly environment = environment;

  constructor(
    private watchService: WatchService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadWatches();
  }

  loadWatches(): void {
    this.isLoading = true;
    this.watchService.getWatches(this.currentPage, 9).subscribe({
      next: (page) => {
        this.watchPage = page;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  handleImageError(event: any) {
    event.target.src = 'assets/images/placeholder-watch.jpg'; // Ensure this asset exists or use a remote URL
    // Or use the high quality placeholder from before
    event.target.src = 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=600&auto=format&fit=crop';
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
    // High quality placeholder for luxury feel
    return 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=600&auto=format&fit=crop';
  }

  addToCart(watch: Watch): void {
    this.cartService.addItem(watch.id, 1).subscribe({
      next: () => {
        console.log('Added to cart');
        // Ideally show a luxury toast notification here
      },
      error: (err) => {
        console.error('Error adding to cart', err);
      }
    });
  }
}
