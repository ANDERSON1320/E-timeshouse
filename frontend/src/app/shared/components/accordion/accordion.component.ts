import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-accordion',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="border-b border-gray-200">
      <button 
        (click)="toggle()" 
        class="w-full flex justify-between items-center py-4 text-left focus:outline-none group">
        <span class="text-sm font-medium uppercase tracking-widest text-luxury-black group-hover:text-luxury-gold transition-colors duration-300">
          {{ title }}
        </span>
        <span class="text-luxury-gold transform transition-transform duration-300" [class.rotate-180]="isOpen">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      
      <div 
        class="overflow-hidden transition-all duration-300 ease-in-out"
        [style.max-height]="isOpen ? '500px' : '0'"
        [style.opacity]="isOpen ? '1' : '0'">
        <div class="pb-6 pt-2">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
    styles: []
})
export class AccordionComponent {
    @Input() title: string = '';
    @Input() isOpen: boolean = false;

    toggle() {
        this.isOpen = !this.isOpen;
    }
}
