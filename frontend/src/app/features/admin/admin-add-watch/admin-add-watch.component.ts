import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WatchService } from '../../../core/services/watch.service';
import { FileService } from '../../../core/services/file.service';
import { CategoryService, Category } from '../../../core/services/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-add-watch',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="pt-32 pb-20 container mx-auto px-6 min-h-screen">
      <div class="max-w-4xl mx-auto">
        
        <div class="flex justify-between items-center mb-8">
           <h1 class="text-3xl font-serif font-bold text-luxury-black">Ajouter une Montre</h1>
           <a routerLink="/admin" class="text-sm text-gray-500 hover:text-luxury-gold transition-colors">Retour au Dashboard</a>
        </div>

        <div class="bg-white p-8 md:p-10 border border-gray-100 shadow-xl rounded-sm">
          <form [formGroup]="watchForm" (ngSubmit)="onSubmit()" class="space-y-8">
            
            <!-- Section 1: Informations de base -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Name -->
              <div class="group">
                <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-luxury-gold transition-colors">Nom du Modèle *</label>
                <input type="text" formControlName="name" 
                       class="w-full bg-gray-50 border border-gray-200 p-4 text-luxury-black focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all"
                       placeholder="Ex: Submariner Date">
                <p *ngIf="watchForm.get('name')?.touched && watchForm.get('name')?.invalid" class="text-red-500 text-xs mt-1">Le nom est requis.</p>
              </div>

              <!-- Brand -->
              <div class="group">
                <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-luxury-gold transition-colors">Marque *</label>
                <input type="text" formControlName="brand" 
                       class="w-full bg-gray-50 border border-gray-200 p-4 text-luxury-black focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all" 
                       placeholder="Ex: ROLEX">
                 <p *ngIf="watchForm.get('brand')?.touched && watchForm.get('brand')?.invalid" class="text-red-500 text-xs mt-1">La marque est requise.</p>
              </div>
            </div>

            <!-- Section 2: Prix, Stock et Catégorie -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <!-- Price -->
              <div class="group">
                <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-luxury-gold transition-colors">Prix (FCFA) *</label>
                <input type="number" formControlName="price" 
                       class="w-full bg-gray-50 border border-gray-200 p-4 text-luxury-black focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all">
              </div>

              <!-- Stock -->
              <div class="group">
                <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-luxury-gold transition-colors">Stock Initial *</label>
                <input type="number" formControlName="stockQuantity" 
                       class="w-full bg-gray-50 border border-gray-200 p-4 text-luxury-black focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all">
              </div>

               <!-- Category -->
              <div class="group">
                <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-luxury-gold transition-colors">Catégorie</label>
                <select formControlName="categoryId" 
                        class="w-full bg-gray-50 border border-gray-200 p-4 text-luxury-black focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all appearance-none cursor-pointer">
                   <option [ngValue]="null">Aucune catégorie</option>
                   <option *ngFor="let cat of categories$ | async" [value]="cat.id">{{ cat.name }}</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="group">
              <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-luxury-gold transition-colors">Description Détaillée *</label>
              <textarea formControlName="description" rows="5" 
                        class="w-full bg-gray-50 border border-gray-200 p-4 text-luxury-black focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all"
                        placeholder="Décrivez les caractéristiques, l'histoire et les détails techniques..."></textarea>
            </div>

            <!-- Image Upload -->
            <div class="p-6 bg-gray-50 border border-dashed border-gray-300 rounded hover:border-luxury-gold transition-colors">
               <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Image Principale *</label>
               
               <div class="flex flex-col md:flex-row items-center gap-8">
                 <!-- Preview Area -->
                 <div class="w-48 h-48 bg-white border border-gray-200 flex items-center justify-center overflow-hidden shadow-inner relative group cursor-pointer" 
                      (click)="fileInput.click()">
                   <img *ngIf="imagePreview" [src]="imagePreview" class="w-full h-full object-contain">
                   <div *ngIf="!imagePreview" class="text-center p-4">
                      <svg class="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      <span class="text-gray-400 text-xs">Cliquez pour ajouter</span>
                   </div>
                   
                   <!-- Hover Overlay -->
                   <div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span class="text-white text-xs font-bold uppercase">Changer</span>
                   </div>
                 </div>
                 
                 <!-- Input & Instructions -->
                 <div class="flex-1">
                   <input #fileInput type="file" (change)="onFileSelected($event)" accept="image/*" class="hidden">
                   
                   <button type="button" (click)="fileInput.click()" class="mb-3 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:border-luxury-gold hover:text-luxury-gold transition-colors">
                     Sélectionner un fichier
                   </button>
                   
                   <p class="text-xs text-gray-400 leading-relaxed">
                     Formats acceptés : JPG, PNG, WEBP.<br>
                     Taille maximale : 5 Mo.<br>
                     Dimensions recommandées : 1000x1200px sur fond blanc ou transparent.
                   </p>
                 </div>
               </div>
            </div>
            
            <!-- Actions -->
            <div class="flex justify-end items-center gap-6 pt-8 border-t border-gray-100">
              <a routerLink="/admin/watches" class="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-luxury-black transition-colors">Annuler</a>
              <button type="submit" 
                      [disabled]="watchForm.invalid || isSubmitting || !selectedFile" 
                      class="bg-luxury-gold text-white text-sm font-bold uppercase tracking-widest py-4 px-10 hover:bg-luxury-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl">
                {{ isSubmitting ? 'Traitement en cours...' : 'Créer le Produit' }}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AdminAddWatchComponent implements OnInit {
  watchForm: FormGroup;
  isSubmitting = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  categories$: Observable<Category[]> | null = null;

  constructor(
    private fb: FormBuilder,
    private watchService: WatchService,
    private fileService: FileService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.watchForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      stockQuantity: [1, [Validators.required, Validators.min(0)]],
      categoryId: [null]
    });
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.watchForm.valid && this.selectedFile) {
      this.isSubmitting = true;

      // 1. Upload File
      this.fileService.uploadFile(this.selectedFile).subscribe({
        next: (response) => {
          const imageUrl = response.fileDownloadUri; // Or construct full URL if needed

          // 2. Create Watch with Image URL
          const formValue = this.watchForm.value;
          const newWatch: any = {
            name: formValue.name,
            brand: formValue.brand,
            price: formValue.price,
            description: formValue.description,
            stockQuantity: formValue.stockQuantity,
            images: [
              {
                imageUrl: imageUrl,
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
        },
        error: (err) => {
          console.error('Error uploading file', err);
          this.isSubmitting = false;
        }
      });
    }
  }
}
