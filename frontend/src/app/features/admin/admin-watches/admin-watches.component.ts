import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WatchService, Watch, WatchPage } from '../../../core/services/watch.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-watches',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="pt-32 pb-20 container mx-auto px-6 min-h-screen">
      <div class="flex justify-between items-center mb-12">
        <h1 class="text-3xl font-serif font-bold text-luxury-black">Gestion des Montres</h1>
        <a routerLink="/admin/watches/add" class="bg-luxury-gold text-white text-sm font-bold uppercase tracking-widest py-3 px-6 hover:bg-luxury-black transition-colors">
          + Nouvelle Montre
        </a>
      </div>

      <div class="bg-white shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th class="py-4 px-6 text-xs font-bold uppercase tracking-widest text-gray-500">Image</th>
                <th class="py-4 px-6 text-xs font-bold uppercase tracking-widest text-gray-500">Nom</th>
                <th class="py-4 px-6 text-xs font-bold uppercase tracking-widest text-gray-500">Marque</th>
                <th class="py-4 px-6 text-xs font-bold uppercase tracking-widest text-gray-500">Prix</th>
                <th class="py-4 px-6 text-xs font-bold uppercase tracking-widest text-gray-500">Stock</th>
                <th class="py-4 px-6 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody *ngIf="watches.length > 0; else emptyState">
              <tr *ngFor="let watch of watches" class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td class="py-4 px-6">
                  <img [src]="getWatchImage(watch)" alt="" class="w-12 h-12 object-contain bg-gray-100 rounded-sm">
                </td>
                <td class="py-4 px-6 font-medium text-luxury-black">{{ watch.name }}</td>
                <td class="py-4 px-6 text-gray-600">{{ watch.brand }}</td>
                <td class="py-4 px-6 font-bold text-luxury-gold">{{ watch.price | number:'1.0-0' }} {{ environment.currency }}</td>
                <td class="py-4 px-6">
                  <span [class.text-red-500]="watch.stockQuantity === 0" [class.text-green-500]="watch.stockQuantity > 0">
                    {{ watch.stockQuantity }}
                  </span>
                </td>
                <td class="py-4 px-6 text-right space-x-2">
                  <button class="text-gray-400 hover:text-luxury-black transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                  </button>
                  <button (click)="deleteWatch(watch.id)" class="text-gray-400 hover:text-red-500 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <ng-template #emptyState>
          <div class="py-12 text-center text-gray-500">
            Aucune montre trouvée.
          </div>
        </ng-template>

        <!-- Simple Pagination (if needed later) -->
        <div class="p-6 border-t border-gray-200 flex justify-between items-center" *ngIf="watchPage && watchPage.totalPages > 1">
           <button (click)="changePage(currentPage - 1)" [disabled]="currentPage === 0" class="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-luxury-black disabled:opacity-30">Précédent</button>
           <span class="text-sm">Page {{ currentPage + 1 }} sur {{ watchPage.totalPages }}</span>
           <button (click)="changePage(currentPage + 1)" [disabled]="currentPage >= watchPage.totalPages - 1" class="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-luxury-black disabled:opacity-30">Suivant</button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AdminWatchesComponent implements OnInit {
  watches: Watch[] = [];
  watchPage: WatchPage | null = null;
  currentPage = 0;
  protected readonly environment = environment;

  constructor(private watchService: WatchService) { }

  ngOnInit(): void {
    this.loadWatches();
  }

  loadWatches(): void {
    this.watchService.getWatches(this.currentPage, 10).subscribe({
      next: (page) => {
        this.watchPage = page;
        this.watches = page.content;
      },
      error: (err) => console.error('Error loading watches', err)
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadWatches();
  }

  getWatchImage(watch: Watch): string {
    if (watch.images && watch.images.length > 0) {
      const primaryImage = watch.images.find(img => img.isPrimary);
      return primaryImage ? primaryImage.imageUrl : watch.images[0].imageUrl;
    }
    return 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=600&auto=format&fit=crop';
  }

  deleteWatch(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette montre ?')) {
      // Implement delete in service first
      this.watchService.deleteWatch(id).subscribe({
        next: () => {
          this.loadWatches();
          // Optional: Show toast
        },
        error: (err) => console.error('Error deleting watch', err)
      });
    }
  }
}
