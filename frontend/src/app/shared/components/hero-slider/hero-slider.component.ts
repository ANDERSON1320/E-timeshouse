import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
}

@Component({
  selector: 'app-hero-slider',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="hero-slider">
      <div class="slides-container">
        <div *ngFor="let slide of slides; let i = index" 
             class="slide" 
             [class.active]="i === currentSlide"
             [style.background-image]="'url(' + slide.image + ')'">
          <div class="slide-content">
            <h1 class="slide-title">{{ slide.title }}</h1>
            <p class="slide-subtitle">{{ slide.subtitle }}</p>
            <a [routerLink]="slide.link" class="slide-cta">{{ slide.cta }}</a>
          </div>
        </div>
      </div>
      
      <div class="slider-controls">
        <button class="prev" (click)="previousSlide()" aria-label="Previous slide">
          ‹
        </button>
        <button class="next" (click)="nextSlide()" aria-label="Next slide">
          ›
        </button>
      </div>
      
      <div class="slider-dots">
        <button *ngFor="let slide of slides; let i = index"
                class="dot"
                [class.active]="i === currentSlide"
                (click)="goToSlide(i)"
                [attr.aria-label]="'Go to slide ' + (i + 1)">
        </button>
      </div>
    </div>
  `,
  styles: [`
    .hero-slider {
      position: relative;
      width: 100%;
      height: 500px;
      overflow: hidden;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xl);
    }

    .slides-container {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      opacity: 0;
      transition: opacity 1s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .slide.active {
      opacity: 1;
      z-index: 1;
    }

    .slide::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%);
    }

    .slide-content {
      position: relative;
      z-index: 2;
      text-align: center;
      color: white;
      max-width: 800px;
      padding: 40px;
      animation: slideIn 0.8s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .slide-title {
      font-size: 3.5rem;
      font-family: 'Playfair Display', serif;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .slide-subtitle {
      font-size: 1.5rem;
      margin-bottom: 30px;
      opacity: 0.95;
    }

    .slide-cta {
      display: inline-block;
      padding: 15px 40px;
      background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-light) 100%);
      color: var(--color-primary);
      text-decoration: none;
      border-radius: var(--radius-md);
      font-weight: 600;
      font-size: 1.1rem;
      transition: all var(--transition-base);
      box-shadow: var(--shadow-gold);
    }

    .slide-cta:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 30px rgba(212, 175, 55, 0.5);
    }

    .slider-controls button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.9);
      border: none;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      font-size: 2rem;
      cursor: pointer;
      z-index: 10;
      transition: all var(--transition-base);
      color: var(--color-primary);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .slider-controls button:hover {
      background: white;
      transform: translateY(-50%) scale(1.1);
      box-shadow: var(--shadow-lg);
    }

    .slider-controls .prev {
      left: 20px;
    }

    .slider-controls .next {
      right: 20px;
    }

    .slider-dots {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
      z-index: 10;
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      border: 2px solid white;
      cursor: pointer;
      transition: all var(--transition-base);
      padding: 0;
    }

    .dot.active {
      background: var(--color-secondary);
      transform: scale(1.3);
    }

    .dot:hover {
      background: rgba(255, 255, 255, 0.8);
    }

    @media (max-width: 768px) {
      .hero-slider {
        height: 400px;
      }

      .slide-title {
        font-size: 2rem;
      }

      .slide-subtitle {
        font-size: 1.1rem;
      }

      .slider-controls button {
        width: 40px;
        height: 40px;
        font-size: 1.5rem;
      }
    }
  `]
})
export class HeroSliderComponent implements OnInit, OnDestroy {
  slides: Slide[] = [
    {
      image: 'assets/images/PHOTOS MONTRES/IMG-20251126-WA0141.jpg',
      title: 'Collection Luxe 2024',
      subtitle: 'Découvrez nos montres d\'exception',
      cta: 'Découvrir',
      link: '/watches'
    },
    {
      image: 'assets/images/PHOTOS MONTRES/IMG-20251126-WA0152.jpg',
      title: 'Nouveautés',
      subtitle: 'Les dernières tendances horlogères',
      cta: 'Voir les nouveautés',
      link: '/watches'
    },
    {
      image: 'assets/images/PHOTOS MONTRES/IMG-20251126-WA0177.jpg',
      title: 'Offres Spéciales',
      subtitle: 'Jusqu\'à -30% sur une sélection',
      cta: 'Profiter',
      link: '/watches'
    }
  ];

  currentSlide = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoPlay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  previousSlide(): void {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.stopAutoPlay();
    this.startAutoPlay(); // Restart auto-play after manual navigation
  }
}
