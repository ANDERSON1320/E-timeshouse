import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero-slider',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="relative h-screen w-full overflow-hidden">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0 bg-black">
        <img 
          src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop" 
          alt="Luxury Watch Background" 
          class="w-full h-full object-cover opacity-60 transition-transform duration-[20s] hover:scale-105"
          style="transform-origin: center center;"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      </div>

      <!-- Content -->
      <div class="relative h-full container mx-auto px-6 flex flex-col justify-center items-start z-10">
        <h2 class="text-luxury-gold text-sm md:text-base uppercase tracking-[0.3em] mb-4 animate-fade-in-up">
          Nouvelle Collection 2024
        </h2>
        <h1 class="text-5xl md:text-7xl lg:text-8xl text-white font-serif font-bold mb-8 leading-tight animate-fade-in-up delay-100">
          L'Élégance <br> Intemporelle.
        </h1>
        <p class="text-gray-300 text-lg md:text-xl max-w-lg mb-10 font-light leading-relaxed animate-fade-in-up delay-200">
          Découvrez notre sélection exclusive de garde-temps d'exception. L'alliance parfaite entre ingénierie de précision et design raffiné.
        </p>
        
        <a routerLink="/watches" class="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold tracking-widest text-white uppercase transition-all duration-300 bg-luxury-gold hover:bg-white hover:text-luxury-black rounded-sm animate-fade-in-up delay-300">
          <span class="relative">Explorer la Collection</span>
          <svg class="w-5 h-5 ml-2 -mr-1 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span class="text-white text-xs uppercase tracking-widest mb-2 opacity-70">Découvrir</span>
        <svg class="w-6 h-6 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7-7-7"></path></svg>
      </div>
    </div>
  `,
  styles: [`
    .delay-100 { animation-delay: 100ms; }
    .delay-200 { animation-delay: 200ms; }
    .delay-300 { animation-delay: 300ms; }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translate3d(0, 40px, 0);
      }
      to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }
    
    .animate-fade-in-up {
      animation-name: fadeInUp;
      animation-duration: 1s;
      animation-fill-mode: both;
    }
  `]
})
export class HeroSliderComponent {
  // Logic simplified as we moved to a single high-impact Hero section
}
