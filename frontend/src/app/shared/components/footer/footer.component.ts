import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="bg-luxury-black text-white pt-20 pb-10 border-t border-gray-800">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <!-- Brand -->
          <div class="col-span-1 md:col-span-1">
            <h2 class="text-2xl font-serif font-bold tracking-widest uppercase mb-6 text-white">E-TimesHouse</h2>
            <p class="text-gray-400 text-sm leading-relaxed mb-6">
              La référence de l'horlogerie de luxe. <br>
              Authenticité garantie, excellence certifiée.
            </p>
            <div class="flex space-x-4">
              <!-- Social Icons (Placeholders) -->
              <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-luxury-gold transition-colors text-white">
                <span class="sr-only">Instagram</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.225-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.644-.069-4.849 0-3.204.012-3.584.069-4.849.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          <!-- Links -->
          <div class="col-span-1">
            <h4 class="text-sm font-bold uppercase tracking-widest text-luxury-gold mb-6">Explorer</h4>
            <ul class="space-y-4 text-sm text-gray-400">
              <li><a routerLink="/watches" class="hover:text-white transition-colors">La Collection</a></li>
              <li><a routerLink="/cart" class="hover:text-white transition-colors">Panier</a></li>
              <li><a routerLink="/login" class="hover:text-white transition-colors">Espace Client</a></li>
              <li><a routerLink="/admin" class="hover:text-white transition-colors">Administration</a></li>
            </ul>
          </div>

          <!-- Legal -->
          <div class="col-span-1">
            <h4 class="text-sm font-bold uppercase tracking-widest text-luxury-gold mb-6">Légal</h4>
            <ul class="space-y-4 text-sm text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">Mentions Légales</a></li>
              <li><a href="#" class="hover:text-white transition-colors">CGV</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Politique de Confidentialité</a></li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div class="col-span-1">
            <h4 class="text-sm font-bold uppercase tracking-widest text-luxury-gold mb-6">Newsletter</h4>
            <p class="text-xs text-gray-400 mb-4">Recevez nos dernières actualités et offres exclusives.</p>
            <div class="flex flex-col space-y-2">
              <input type="email" placeholder="Votre email" class="bg-gray-900 border border-gray-700 text-white px-4 py-2 text-sm focus:outline-none focus:border-luxury-gold transition-colors">
              <button class="bg-luxury-gold text-white text-xs font-bold uppercase tracking-widest py-3 px-6 hover:opacity-90 transition-opacity">S'abonner</button>
            </div>
          </div>
          
        </div>

        <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; 2024 E-TimesHouse. Tous droits réservés.</p>
          <p class="mt-2 md:mt-0 font-serif italic">Designed by cjvision</p>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent { }
