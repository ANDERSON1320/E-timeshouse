import { Component, OnInit } from '@angular/core'; // Trigger re-compile
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WatchService, Watch, ProductVariant } from '../../../core/services/watch.service';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-watch-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './watch-detail.component.html',
  styleUrls: ['./watch-detail.component.css']
})
export class WatchDetailComponent implements OnInit {
  watch: Watch | null = null;
  variants: ProductVariant[] = [];
  selectedVariant: ProductVariant | null = null;
  selectedImage: string = '';
  selectedSize: string = '';
  selectedColor: string = '';
  quantity: number = 1;
  protected readonly environment = environment;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private watchService: WatchService,
    private cartService: CartService,
    public authService: AuthService,
    private notificationService: NotificationService
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
        this.notificationService.warning('Veuillez sélectionner les options (Taille/Couleur)');
        return;
      }

      // TODO: Update CartService to handle variants
      // For now we just add the base item, but ideally we pass the variant ID
      this.cartService.addItem(this.watch.id, this.quantity).subscribe(() => {
        this.notificationService.success('Article ajouté au panier !');
      });
    }
  }

  buyNow(): void {
    this.addToCart();
    this.router.navigate(['/cart']);
  }
}

