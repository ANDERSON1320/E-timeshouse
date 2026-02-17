import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WatchService } from '../../../core/services/watch.service';

@Component({
  selector: 'app-admin-add-watch',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="pt-32 pb-20 container mx-auto px-6 min-h-screen">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-serif font-bold text-luxury-black mb-8">Ajouter une Nouvelle Montre</h1>

        <div class="bg-white p-8 border border-gray-100 shadow-sm">
          <form [formGroup]="watchForm" (ngSubmit)="onSubmit()" class="space-y-6">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Name -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Nom du Modèle</label>
                <input type="text" formControlName="name" class="w-full bg-gray-50 border border-gray-200 p-3 text-luxury-black focus:outline-none focus:border-luxury-gold transition-colors">
              </div>

              <!-- Brand -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Marque</label>
                <input type="text" formControlName="brand" class="w-full bg-gray-50 border border-gray-200 p-3 text-luxury-black focus:outline-none focus:border-luxury-gold transition-colors" placeholder="ex: ROLEX">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Price -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Prix (FCFA)</label>
                <input type="number" formControlName="price" class="w-full bg-gray-50 border border-gray-200 p-3 text-luxury-black focus:outline-none focus:border-luxury-gold transition-colors">
              </div>

              <!-- Stock -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Stock Initial</label>
                <input type="number" formControlName="stockQuantity" class="w-full bg-gray-50 border border-gray-200 p-3 text-luxury-black focus:outline-none focus:border-luxury-gold transition-colors">
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Description</label>
              <textarea formControlName="description" rows="4" class="w-full bg-gray-50 border border-gray-200 p-3 text-luxury-black focus:outline-none focus:border-luxury-gold transition-colors"></textarea>
            </div>

            <!-- Image URL -->
            <div>
               <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">URL de l'Image Principale</label>
               <input type="text" formControlName="imageUrl" class="w-full bg-gray-50 border border-gray-200 p-3 text-luxury-black focus:outline-none focus:border-luxury-gold transition-colors" placeholder="https://...">
               <p class="text-xs text-gray-400 mt-1">Utilisez une URL Unsplash ou autre pour l'instant.</p>
            </div>
            
            <!-- Actions -->
            <div class="flex justify-end items-center gap-4 pt-6 border-t border-gray-100">
              <a routerLink="/admin/watches" class="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-luxury-black">Annuler</a>
              <button type="submit" [disabled]="watchForm.invalid || isSubmitting" class="bg-luxury-gold text-white text-sm font-bold uppercase tracking-widest py-3 px-8 hover:bg-luxury-black transition-colors disabled:opacity-50">
                {{ isSubmitting ? 'Création...' : 'Créer la Montre' }}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AdminAddWatchComponent {
  watchForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private watchService: WatchService,
    private router: Router
  ) {
    this.watchForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      stockQuantity: [1, [Validators.required, Validators.min(0)]],
      imageUrl: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.watchForm.valid) {
      this.isSubmitting = true;
      const formValue = this.watchForm.value;

      // Transform form value to match backend expectation
      // Watch entity expects images array, but for creation we might need to handle it differently
      // Since WatchService.createWatch takes a Watch object which has images: WatchImage[]
      // We need to construct it properly.

      const newWatch: any = {
        name: formValue.name,
        brand: formValue.brand,
        price: formValue.price,
        description: formValue.description,
        stockQuantity: formValue.stockQuantity,
        images: [
          {
            imageUrl: formValue.imageUrl,
            isPrimary: true,
            displayOrder: 0
          }
        ]
      };

      this.watchService.createWatch(newWatch).subscribe({
        next: () => {
          this.router.navigate(['/admin/watches']);
        },
        error: (err) => {
          console.error('Error creating watch', err);
          this.isSubmitting = false;
        }
      });
    }
  }
}
