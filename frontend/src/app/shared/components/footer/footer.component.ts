import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="bg-luxury-black text-white py-16 border-t border-gray-900">
      <div class="container mx-auto px-6">
        
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          
          <!-- Brand & Tagline -->
          <div class="max-w-md">
            <h2 class="text-3xl font-serif font-bold tracking-widest uppercase mb-4 text-white">E-TimesHouse</h2>
            <p class="text-gray-400 text-sm leading-relaxed font-light">
              L'excellence horlogère à votre poignet. <br>
              Une sélection curée des plus grandes maisons.
            </p>
          </div>

        </div>

        <div class="mt-16 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>&copy; 2024 E-TimesHouse. Authenticité Garantie.</p>
          <div class="flex gap-6 mt-4 md:mt-0">
             <a href="#" class="hover:text-gray-400 transition-colors">Mentions Légales</a>
             <a href="#" class="hover:text-gray-400 transition-colors">Politique de Confidentialité</a>
          </div>
        </div>

      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent { }
